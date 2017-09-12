var select;
$(document).ready(function () {
    var $search_button = $('#serchBtn');
    var searchTxt = document.getElementById('serch').value;
    if(searchTxt) {
        console.log('있음');
        $('#serchBtn').trigger('click');
    }else {
        console.log('없음');
    }

    $search_button.click(function () {
        search_feeling();
    });

    // $('#select_result').on('click','li',function () {
    //     var select_id = $(this).data('id');
    //     select_id = encodeURIComponent(select_id);
    //     $.ajax({
    //         url:'/feeling/search/'+select_id,
    //         dataType:'json',
    //         type:'GET',
    //         data:{},
    //         success:function (data) {
    //             console.log(data);
    //
    //         //     var html = '';
    //         //     for(var i=0; i<data.result.length; i++) {
    //         //         var data_result = data.result[i];
    //         //         html += '<li data-id='+data_result['@rid']+'><a href="#"> 타이틀 : '+data_result.title+' , - '+data_result["@class"]+'</data></a></li>';
    //         //     }
    //         //     // html += '</ul>';
    //         //     $('#select_result').html(html);
    //         },
    //         error:function () {
    //             alert('검색에 실패했습니다.');
    //         }
    //     })
    // });
});

var search_feeling = function() {
    var searchTxt = document.getElementById('serch').value;
    var where_sql = "feeling like '%" + searchTxt.replace(/\s/g, "").replace(/,/g, "%' and feeling like '%") + "%')";

    $.ajax({
        url:'/feeling/search',
        dataType:'json',
        type:"POST",
        data:{where_sql:where_sql},
        success:function (data) {
            console.log(data);

            var html = '';
            for(var i=0; i<data.result.length; i++) {
                var data_result = data.result[i];
                var url = "/feeling/search/"+encodeURIComponent(data_result['@rid']);
                html += '<li data-id='+data_result['@rid']+'><a href='+url+' class="list-group-item" > 타이틀 : '+data_result.title+' , - '+data_result["@class"]+'</data></a></li>';
            }
            // html += '</ul>';
            $('#select_result').html(html);
        },
        error:function () {
            alert('검색에 실패했습니다.');
        }
    })
};

// select feeling from E where @rid in (select inE() from Music where title='test3')