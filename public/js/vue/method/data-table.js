define(["exports","./bs-component"],(function(a,e){"use strict";var t;Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var o={mixins:[(e=(t=e)&&t.__esModule?t:{default:t}).default],methods:{initDataTable:function(){var a,e;a=jQuery,e=this,a(".data-table.dataTable").each((function(){let e=a(this).attr("id");dataTables[e].ref.destroy()})),setTimeout((function(){a(".data-table:not(.dataTable)").each((function(){let t=a(this).attr("id");dataTables[t]={},dataTables[t].init=!1,dataTables[t].ref=a("#"+t).DataTable({language:{url:"json/datatables."+e.$i18n.locale+".json"}})})),a(".data-table").on("init.dt",(function(t,o,r){let d=a(t.target).attr("id"),l=JSON.parse(window.localStorage.getItem(d));"object"==typeof dataTables[d]&&("object"==typeof l&&null!==l&&(dataTables[d].ref.order([l.orderColumn,l.orderBy]).draw(),dataTables[d].ref.search(l.search),dataTables[d].ref.page.len(l.length),dataTables[d].ref.page(l.page).draw("page")),dataTables[d].init=!0,localStorage.setItem(d,JSON.stringify(l)),e.initTooltip(),e.initPopover())})),a(".data-table").on("length.dt",(function(t,o,r){e.setDataTableState(a(t.target).attr("id")),a('[data-toggle="popover"]').popover("hide")})),a(".data-table").on("order.dt",(function(t,o,r){e.setDataTableState(a(t.target).attr("id")),a('[data-toggle="popover"]').popover("hide")})),a(".data-table").on("page.dt",(function(t,o){e.setDataTableState(a(t.target).attr("id")),a('[data-toggle="popover"]').popover("hide")})),a(".data-table").on("search.dt",(function(t,o){e.setDataTableState(a(t.target).attr("id")),a('[data-toggle="popover"]').popover("hide")}))}),300)},removeDataTableRow:function(a,e){void 0!==dataTables[e]&&(dataTables[e].ref.row(a).remove().draw(),dataTables[e].ref.order(dataTables[e].ref.order()[0]).draw())},setDataTableState:function(a){let e=JSON.parse(window.localStorage.getItem(a));if("object"==typeof e&&!0===dataTables[a].init){let t=dataTables[a].ref.order(),o=dataTables[a].ref.page.info(),r=dataTables[a].ref.search();e={init:!1,length:o.length,orderColumn:t[0][0],orderBy:t[0][1],page:o.page,search:r},window.localStorage.setItem(a,JSON.stringify(e))}},updateDataTableRow:function(a,e){setTimeout((function(){void 0!==dataTables[e]&&(dataTables[e].ref.row(a).invalidate(),dataTables[e].ref.order(dataTables[e].ref.order()[0]).draw())}),100)},updateDataTableRows:function(a){setTimeout((function(){void 0!==dataTables[a]&&(dataTables[a].ref.rows().invalidate(),dataTables[a].ref.order(dataTables[a].ref.order()[0]).draw())}),100)}}};a.default=o}));