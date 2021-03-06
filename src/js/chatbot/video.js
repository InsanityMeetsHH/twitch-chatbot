const database     = require('./database');
const locales      = require('./locales');
const fs           = require('fs');
const mediainfo    = require('mediainfo-wrapper');
const moment       = require('moment');
const request      = require('request');
const {v4: uuidv4} = require('uuid');

const video = {
    currentStarts: {}, // unix timestamp (seconds)
    /**
     * Adds a video
     * 
     * @param {object} chatbot
     * @param {object} args
     * @returns {undefined}
     */
    add: function(chatbot, args) {
        if (chatbot.socket !== null) {
            delete args.video.durationHours;
            delete args.video.durationMin;
            delete args.video.durationSec;
            delete args.video.autofill;
            let time = moment().unix();

            let values = {
                channelId: chatbot.channels[args.channel].id,
                name: args.video.name,
                subName: args.video.subName,
                file: args.video.file,
                duration: args.video.duration, // unix timestamp (seconds)
                player: args.video.player,
                updatedAt: time, // unix timestamp (seconds)
                createdAt: time // unix timestamp (seconds)
            };

            let select = 'v.id, p.name, pvj.sort';
            let from = 'playlist AS p';
            let join = 'LEFT JOIN playlist_video_join AS pvj ON p.id = pvj.playlist_id ';
            join += 'LEFT JOIN video AS v ON pvj.video_id = v.id';
            let where = ['p.id = ?'];

            // find videos from playlist
            database.find(select, from, join, where, '', 'sort', 0, [args.video.playlistId], function(rows) {
                // if video.id is defined, just add playlist relation
                if (args.video.id) {
                    values = {
                        uuid: uuidv4(),
                        playlistId: args.video.playlistId,
                        videoId: args.video.id,
                        played: args.video.played,
                        skipped: args.video.skipped,
                        titleCmd: args.video.titleCmd,
                        gameCmd: args.video.gameCmd,
                        start: 0,
                        end: 0,
                        sort: rows[0].sort === null ? 0 : 1 * (rows[rows.length - 1].sort + 1),
                        updatedAt: time, // unix timestamp (seconds)
                        createdAt: time // unix timestamp (seconds)
                    };

                    database.insert('playlist_video_join', [values], function() {
                        if (args.video.playlistId === chatbot.activePlaylists[args.channel].id) {
                            values.id = values.videoId;
                            values.name = args.video.name;
                            values.subName = args.video.subName;
                            values.file = args.video.file;
                            values.duration = args.video.duration; // unix timestamp (seconds)
                            values.player = args.video.player;
                            chatbot.getActivePlaylist(chatbot, args);
                        }

                        chatbot.getPlaylists(chatbot, args);
                        console.log(locales.t('video-added', [args.video.name, rows[0].name]));
                    });
                } else {
                    database.insert('video', [values], function(insert) {
                        values = {
                            uuid: uuidv4(),
                            playlistId: args.video.playlistId,
                            videoId: insert.lastID,
                            played: args.video.played,
                            skipped: args.video.skipped,
                            titleCmd: args.video.titleCmd,
                            gameCmd: args.video.gameCmd,
                            start: 0,
                            end: 0,
                            sort: rows[0].sort === null ? 0 : 1 * (rows[rows.length - 1].sort + 1),
                            updatedAt: time,
                            createdAt: time
                        };

                        database.insert('playlist_video_join', [values], function() {
                            if (args.video.playlistId === chatbot.activePlaylists[args.channel].id) {
                                values.id = values.videoId;
                                values.name = args.video.name;
                                values.subName = args.video.subName;
                                values.file = args.video.file;
                                values.duration = args.video.duration; // unix timestamp (seconds)
                                values.player = args.video.player;
                                chatbot.getActivePlaylist(chatbot, args);
                            }

                            chatbot.getPlaylists(chatbot, args);
                            console.log(locales.t('video-added', [args.video.name, rows[0].name]));
                        });
                    });
                }
            });
        }
    },
    /**
     * Sends the next video to frontend and changes stream title and/or game
     * 
     * @param {object} chatbot
     * @param {object} args
     * @returns {undefined}
     */
    get: function(chatbot, args) {
        if (chatbot.socketVideo !== null) {
            let match = false;
            let matchUuid = '';
            let uuidArray = [];

            let videoItem = {
                name: '',
                subName: '',
                file: '',
                played: false,
                skipped: false,
                duration: 0,
                player: 'empty'
            };

            for (let i = 0; i < chatbot.activePlaylists[args.channel].videos.length; i++) {
                // set all videos after match to played = false
                if (chatbot.activePlaylists[args.channel].videos[i].skipped || match) {
                    chatbot.activePlaylists[args.channel].videos[i].played = false;
                    uuidArray.push(chatbot.activePlaylists[args.channel].videos[i].uuid);

                    // if video is skipped
                    if (chatbot.activePlaylists[args.channel].videos[i].skipped) {
                        continue;
                    }
                }

                // find next video to play
                if (!chatbot.activePlaylists[args.channel].videos[i].played && !match) {
                    videoItem = chatbot.activePlaylists[args.channel].videos[i];
                    chatbot.activePlaylists[args.channel].videos[i].played = true;
                    video.currentStarts[args.channel] = moment().unix();
                    matchUuid = chatbot.activePlaylists[args.channel].videos[i].uuid;
                    match = true;
                }
            }

            if (chatbot.channels[args.channel].oauthToken.length) {
                let set = {'channel': {}};

                // if titleCmd is set, change stream titel
                if (typeof videoItem.titleCmd !== 'undefined' && videoItem.titleCmd.length) {
                    set.channel.status = videoItem.titleCmd;
                }

                // if gameCmd is set, change stream game
                if (typeof videoItem.gameCmd !== 'undefined' && videoItem.gameCmd.length) {
                    set.channel.game = videoItem.gameCmd;
                }

                if (Object.keys(set.channel).length) {
                    let options = {
                        url: `https://api.twitch.tv/v5/channels/${chatbot.channels[args.channel].id}`,
                        method: 'PUT',
                        json: true,
                        headers: {
                            'Accept': 'application/vnd.twitchtv.v5+json',
                            'Authorization': `OAuth ${chatbot.channels[args.channel].oauthToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(set)
                    };

                    // change stream game and/ or title
                    request(options, (err, res, body) => {
                        if (err) {
                            return console.log(err);
                        }

                        if (typeof body.error === 'undefined') {
                            if (typeof set.channel.status !== 'undefined' && typeof set.channel.game !== 'undefined' ) {
                                locales.t('change-channel-1', [set.channel.status, set.channel.game]);
                            } else if (typeof set.channel.status !== 'undefined') {
                                locales.t('change-channel-2', [set.channel.status]);
                            } else {
                                locales.t('change-channel-3', [set.channel.game]);
                            }
                        } else {
                            if (typeof set.channel.status !== 'undefined' && typeof set.channel.game !== 'undefined' ) {
                                locales.t('could-not-change-channel-1', [set.channel.status, set.channel.game]);
                            } else if (typeof set.channel.status !== 'undefined') {
                                locales.t('could-not-change-channel-2', [set.channel.status]);
                            } else {
                                locales.t('could-not-change-channel-3', [set.channel.game]);
                            }
                        }
                    });
                }
            } else {
                // if titleCmd is set, change stream titel
                if (typeof videoItem.titleCmd !== 'undefined' && videoItem.titleCmd.length) {
                    chatbot.client.say('#' + args.channel, `!title ${videoItem.titleCmd}`);
                }

                // if gameCmd is set, change stream game
                if (typeof videoItem.gameCmd !== 'undefined' && videoItem.gameCmd.length) {
                    chatbot.client.say('#' + args.channel, `!game ${videoItem.gameCmd}`);
                }
            }

            const call = {
                args: {
                    channel: args.channel,
                    item: videoItem
                },
                method: 'setVideo',
                ref: 'player',
                env: 'browser'
            };

            chatbot.socketVideo.write(JSON.stringify(call));

            if (matchUuid.length) {
                let from = 'playlist_video_join';
                let set = {played: true, start: 0, end: 0};
                let where = [`uuid = '${matchUuid}'`];

                database.update(from, set, where, function(update) {
                    if (uuidArray.length) {
                        set = {played: false, start: 0, end: 0};
                        where = [`uuid IN ('${uuidArray.join('\', \'')}')`];

                        database.update(from, set, where, function(updateNotPlayed) {
                            chatbot.getActivePlaylist(chatbot, args);
                        });
                    } else {
                        chatbot.getActivePlaylist(chatbot, args);
                    }
                });
            } else {
                chatbot.getActivePlaylist(chatbot, args);
            }
        }
    },
    /**
     * Returns index of given video in videos
     * 
     * @param {object} videos
     * @param {object} videoItem
     * @returns {number}
     */
    getIndexFromVideos: function(videos, videoItem) {
        for (let i = 0; i < videos.length; i++) {
            if (videoItem.uuid === videos[i].uuid) {
                return i;
            }
        }
        return -1;
    },
    /**
     * Sends meta information from local file to frontend
     * 
     * @param {object} chatbot
     * @param {object} args
     * @returns {undefined}
     */
    getLocalVideoMeta: function(chatbot, args) {
        let localRegExp = /(.*)(\.mp4)$/i;
        let call = {
            args: {
                channel: args.channel,
                name: '',
                subName: '',
                duration: 0
            },
            method: 'setVideoMetaToForm',
            ref: 'playlist',
            env: 'browser'
        };

        // if ending with .mp4 and file exists
        if (localRegExp.test(args.file) && fs.existsSync(chatbot.config.videosFolder + args.file)) {
            mediainfo(chatbot.config.videosFolder + args.file).then(function(data) {
                if (data.length && typeof data[0].general !== 'undefined') {
                    // milliseconds to seconds
                    let duration = ((data[0].general.duration[0] / 1000) -.5).toFixed(0);
                    let format = locales.t('date');
                    let name = args.file
                        .split('/').pop()
                        .replace(localRegExp, '$1')
                        .replace(/(-|_| )([a-z])/gi, function($0, $1, $2) {
                            let prefix = ' ';

                            if ($1 === '-') {
                                prefix = ' - ';
                            }

                            return prefix + $2.toUpperCase();
                        });
                    name = name[0].toUpperCase() + name.slice(1);
                    let isoDate = data[0].general.file_last_modification_date[0].replace(/^(UTC )([0-9-]+) ([0-9:.]+)$/, '$2T$3Z');
                    let subName = moment(isoDate).format(format);

                    // if duration greater than 23:59:59 hours
                    if (duration > 86399) {
                        duration = 0;
                    }

                    if (chatbot.socket !== null && duration) {
                        call.args.name = name;
                        call.args.subName = subName;
                        call.args.duration = duration;
                        chatbot.socket.write(JSON.stringify(call));
                    }
                }
            }).catch(function(e) {
                console.error(e);
            });
        } else if (chatbot.socket !== null) {
            chatbot.socket.write(JSON.stringify(call));
        }
    },
    /**
     * Sends video by given videoSearch to frontend
     * 
     * @param {object} chatbot
     * @param {object} args
     * @returns {undefined}
     */
    getSearchResults: function(chatbot, args) {
        let search = args.videoSearch.replace(/ /g, '%');
        let select = 'id, name, sub_name AS subName, file, ';
        select += 'duration, player, updated_at AS updatedAt, created_at AS createdAt';
        let where = ['channel_id = ?', '(name LIKE ? OR file LIKE ?)'];
        let prepare = [chatbot.channels[args.channel].id, `%${search}%`, `%${search}%`];

        database.find(select, 'video', '', where, '', 'name', 30, prepare, function(rows) {
            if (chatbot.socket !== null) {
                const call = {
                    args: {
                        channel: args.channel,
                        list: rows
                    },
                    method: 'setVideoSearchResults',
                    ref: 'playlist',
                    env: 'browser'
                };

                chatbot.socket.write(JSON.stringify(call));
            }
        });
    },
    /**
     * Sends meta information from twitch clip to frontend
     * 
     * @param {object} chatbot
     * @param {object} args
     * @returns {undefined}
     */
    getTwitchClipMeta: function(chatbot, args) {
        let call = {
            args: {
                channel: args.channel,
                name: '',
                subName: '',
                duration: 0
            },
            method: 'setVideoMetaToForm',
            ref: 'playlist',
            env: 'browser'
        };

        // if file fits pattern and token is defined
        if (/^[A-Z][A-Za-z0-9]+$/.test(args.file) && chatbot.config.clientIdToken.length) {
            let options = {
                url: `https://api.twitch.tv/kraken/clips/${args.file}`,
                method: 'GET',
                json: true,
                headers: {
                    'Accept': 'application/vnd.twitchtv.v5+json',
                    'Client-ID': chatbot.config.clientIdToken
                }
            };

            // get single twitch video
            request(options, (err, res, body) => {
                if (err) {
                    return console.log(err);
                }

                if (typeof body.title !== 'undefined') {
                    let duration = (body.duration -.5).toFixed(0);
                    let format = locales.t('date');
                    let name = body.title;
                    let subName = (body.game.length ? `${body.game} - ` : '') + 'Clip';
                    subName += ` (${moment(body.created_at).format(format)})`;

                    // if duration greater than 23:59:59 hours
                    if (duration > 86399) {
                        duration = 0;
                    }

                    if (chatbot.socket !== null && duration) {
                        call.args.name = name;
                        call.args.subName = subName;
                        call.args.duration = duration;
                        chatbot.socket.write(JSON.stringify(call));
                    }
                }
            });
        } else if (chatbot.socket !== null) {
            chatbot.socket.write(JSON.stringify(call));
        }
    },
    /**
     * Sends meta information from twitch video to frontend
     * 
     * @param {object} chatbot
     * @param {object} args
     * @returns {undefined}
     */
    getTwitchVideoMeta: function(chatbot, args) {
        let call = {
            args: {
                channel: args.channel,
                name: '',
                subName: '',
                duration: 0
            },
            method: 'setVideoMetaToForm',
            ref: 'playlist',
            env: 'browser'
        };

        // if file fits pattern and token is defined
        if (/^[0-9]+$/.test(args.file) && chatbot.config.clientIdToken.length) {
            let options = {
                url: `https://api.twitch.tv/kraken/videos/${args.file}`,
                method: 'GET',
                json: true,
                headers: {
                    'Accept': 'application/vnd.twitchtv.v5+json',
                    'Client-ID': chatbot.config.clientIdToken
                }
            };

            // get single twitch video
            request(options, (err, res, body) => {
                if (err) {
                    return console.log(err);
                }

                if (typeof body.title !== 'undefined' 
                    && body.status === 'recorded') {
                    let duration = body.length;
                    let format = locales.t('date');
                    let name = body.title;
                    let subName = body.game.length ? `${body.game} (${moment(body.created_at).format(format)})` : moment(body.created_at).format(format);

                    // if duration greater than 23:59:59 hours
                    if (duration > 86399) {
                        duration = 0;
                    }

                    if (chatbot.socket !== null && duration) {
                        call.args.name = name;
                        call.args.subName = subName;
                        call.args.duration = duration;
                        chatbot.socket.write(JSON.stringify(call));
                    }
                }
            });
        } else if (chatbot.socket !== null) {
            chatbot.socket.write(JSON.stringify(call));
        }
    },
    /**
     * Sends meta information from youtube video to frontend
     * 
     * @param {object} chatbot
     * @param {object} args
     * @returns {undefined}
     */
    getYoutubeVideoMeta: function(chatbot, args) {
        let call = {
            args: {
                channel: args.channel,
                name: '',
                subName: '',
                duration: 0
            },
            method: 'setVideoMetaToForm',
            ref: 'playlist',
            env: 'browser'
        };

        // if file is 11 chars long, fits pattern and token is defined
        if (/^[a-z0-9_-]{11}$/i.test(args.file) && chatbot.config.youtubeToken.length) {
            let options = {
                url: `https://www.googleapis.com/youtube/v3/videos?id=${args.file}&key=${chatbot.config.youtubeToken}&part=snippet,contentDetails,statistics,status`,
                method: 'GET',
                json: true
            };

            // get single youtube video
            request(options, (err, res, body) => {
                if (err) {
                    return console.log(err);
                }

                if (typeof body.items !== 'undefined' && body.items.length) {
                    let duration = 0;
                    let durationRegExp = /^PT([0-9]+H)?([0-9]+M)?([0-9]+S)?/;
                    let durationString = body.items[0].contentDetails.duration;
                    let format = locales.t('date');
                    let multiplier = 60 * 60;
                    let name = body.items[0].snippet.title;
                    let subName = typeof body.items[0].snippet.tags === 'undefined' ? '' : body.items[0].snippet.tags[0];
                    subName += subName.length ? ` (${moment(body.items[0].snippet.publishedAt).format(format)})` : moment(body.items[0].snippet.publishedAt).format(format);

                    // if duration fits pattern
                    if (durationRegExp.test(durationString)) {
                        let match = durationString.match(durationRegExp);

                        for (let i = 1; i <= 3; i++) {
                            if (typeof match[i] === 'string') {
                                duration += parseInt(match[i]) * multiplier;
                            }
                            multiplier /= 60;
                        }

                        // if duration greater than 23:59:59 hours
                        if (duration > 86399) {
                            duration = 0;
                        }

                        if (chatbot.socket !== null) {
                            call.args.name = name;
                            call.args.subName = subName;
                            call.args.duration = duration;
                            chatbot.socket.write(JSON.stringify(call));
                        }
                    }
                }
            });
        } else if (chatbot.socket !== null) {
            chatbot.socket.write(JSON.stringify(call));
        }
    },
    /**
     * Moves a video in sorting order
     * 
     * @param {object} chatbot
     * @param {object} args
     * @returns {undefined}
     */
    move: function(chatbot, args) {
        let time = moment().unix();
        let from = 'playlist_video_join';
        let direction = args.direction > 0 ? 'down' : 'up';
        let where = ['playlist_id = ?'];
        let prepare = [args.playlist.id];

        database.find('*', from, '', where, '', 'sort', 0, prepare, function(rows) {
            let videoIndex = video.getIndexFromVideos(rows, args.video);

            if (videoIndex < 0) {
                return false;
            }

            let sort = rows[videoIndex].sort;
            rows[videoIndex].sort = rows[videoIndex + args.direction].sort;
            rows[videoIndex + args.direction].sort = sort;
            let set = {
                updatedAt: time,
                sort: rows[videoIndex].sort
            };
            where = [`uuid = '${rows[videoIndex].uuid}'`];

            database.update(from, set, where, function() {
                set = {
                    updatedAt: time,
                    sort: rows[videoIndex + args.direction].sort
                };
                where = [`uuid = '${rows[videoIndex + args.direction].uuid}'`];

                database.update(from, set, where, function() {
                    if (args.playlist.id === chatbot.activePlaylists[args.channel].id) {
                        chatbot.getActivePlaylist(chatbot, args);
                    }
                    chatbot.getPlaylist(chatbot, args);
                    console.log(locales.t('video-moved', [args.video.name, locales.t(direction), args.playlist.name]));
                });
            });
        });
    },
    /**
     * Removes video
     * 
     * @param {object} chatbot
     * @param {object} args
     * @returns {undefined}
     */
    remove: function(chatbot, args) {
        database.remove('playlist_video_join', ['uuid = ?'], [args.video.uuid], function(remove) {
            chatbot.getPlaylists(chatbot, args);

            // if is active playlist
            if (args.playlist.id === chatbot.activePlaylists[args.channel].id) {
                chatbot.getActivePlaylist(chatbot, args);
            }

            chatbot.getPlaylist(chatbot, args);
            console.log(locales.t('video-removed', [args.video.name, args.playlist.name]));
        });
    },
    /**
     * Updates video properties
     * 
     * @param {object} chatbot
     * @param {object} args
     * @returns {undefined}
     */
    update: function(chatbot, args) {
        if (chatbot.socket !== null) {
            let reloadActivePlaylist = false;
            let deleteProperties = ['durationHours', 'durationMin', 'durationSec', 'autofill'];
            args.video.updatedAt = moment().unix(); // unix timestamp (seconds)

            // delete properties which are not in database
            for (let i = 0; i < deleteProperties.length; i++) {
                if (typeof args.video[deleteProperties[i]] !== 'undefined') {
                    delete args.video[deleteProperties[i]];
                    reloadActivePlaylist = true;
                }
            }

            let set = {
                name: args.video.name,
                subName: args.video.subName,
                file: args.video.file,
                duration: args.video.duration, // unix timestamp (seconds)
                player: args.video.player,
                updatedAt: args.video.updatedAt
            };

            database.update('video', set, [`id = ${args.video.id}`], function() {
                set = {
                    played: args.video.played,
                    skipped: args.video.skipped,
                    titleCmd: args.video.titleCmd,
                    gameCmd: args.video.gameCmd,
                    start: 0,
                    end: 0,
                    updatedAt: args.video.updatedAt
                };

                database.update('playlist_video_join', set, [`uuid = '${args.video.uuid}'`], function() {
                    // if is active playlist
                    if (args.video.playlistId === chatbot.activePlaylists[args.channel].id) {
                        let videoIndex = video.getIndexFromVideos(chatbot.activePlaylists[args.channel].videos, args.video);
                        chatbot.activePlaylists[args.channel].videos[videoIndex] = args.video;

                        if (reloadActivePlaylist) {
                            chatbot.getActivePlaylist(chatbot, args);
                        }
                    }

                    console.log(locales.t('video-updated', [args.video.name, args.playlist.name]));
                });
            });
        }
    }
};

module.exports = video;
