<script>
    export default {
        data: function() {
            return {
                channels: []
            };
        },
        mounted: function() {
            this.getChannels();
        },
        methods: {
            getChannels: function() {
                if (typeof socketWrite === 'function') {
                    const call = {
                        method: 'getChannels',
                        env: 'node'
                    };

                    socketWrite(call);
                }
            },
            setChannels: function(args) {
                this.channels = args.list.split(';');
            }
        }
    };
</script>

<template>
    <div class="row">
        <div class="col-12">
            <div class="row channels">
                <div v-for="channel in channels" :key="channel" class="col-12 col-sm-6 col-md-4 col-xl-3 pb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title text-center mb-0">
                                {{ channel }}
                            </h5>
                            <router-link class="stretched-link" :to="{ name: 'channel', params: { channel: channel } }" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
