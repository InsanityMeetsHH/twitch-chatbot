<script>
    import bsComponent from '../../method/bs-component';
    import dataTable from '../../method/data-table';

    export default {
        mixins: [bsComponent, dataTable],
        props: {
            drop: {
                type: String,
                default: 'up'
            }
        },
        data: function() {
            return {
                currentLocale: window.localStorage.getItem('currentLocale') ? window.localStorage.getItem('currentLocale') : 'en',
                fallbackLocale: 'en',
                languages: ['en', 'de'],
                init: false
            };
        },
        watch: {
            currentLocale(newLocale) {
                window.localStorage.currentLocale = newLocale;
            }
        },
        mounted: function() {
            this.changeLang(this.currentLocale);
        },
        methods: {
            changeLang: function(lang) {
                let $this = this;
                $this.$i18n.locale = lang;
                $this.currentLocale = lang;
                window.localStorage.setItem('currentLocale', lang);

                setTimeout(function() {
                    if ($this.init) {
                        $this.initDataTable();
                    }
                    $this.initTooltip();
                    $this.initPopover();
                    $this.init = true;
                }, 250);
            },
            getButtonClass: function() {
                return 'drop' + this.drop;
            }
        }
    };
</script>

<template>
    <div class="col-auto">
        <div class="btn-group" :class="getButtonClass()">
            <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <font-awesome-icon :icon="['fas', 'globe']" class="fa-fw" />
            </button>
            <div class="dropdown-menu">
                <a v-for="locale in languages" :key="locale" class="dropdown-item" :class="{active: locale === currentLocale}" onclick="javascript:return false;" href="#" @click="changeLang(locale)">{{ $t('lang-' + locale) }}</a>
            </div>
        </div>
    </div>
</template>
