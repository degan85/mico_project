var select;
var result;

/*
    편집 기능
    다양한 사람이 느낌을 읿력할 경우를 위해 수정해야함(느낌이 여러개일 수 있음)
    사진 넣기 
    느낌들 나열하기
 */

$(document).ready(function () {
    var $search_button = $('#serchBtn');
    var searchTxt = document.getElementById('serch').value;
    if(searchTxt) {
        search_feeling();
    }else {
    }

    $search_button.click(function () {
        search_feeling();
    });

    $('#select_result').on('click','a',function () {
        select = $(this);
        var select_id = $(this).data('id');
        $.ajax({
            url:'/feeling/search/detail',
            dataType:'json',
            type:'POST',
            data:{select_id: select_id},
            success:function (data) {
                result = data;
                console.log(data);
                var detail_div = select.children();
                var detail_text= 'Genre : '+result.result[0]['@class']
                                 +  ', feeling : '+ result.result[1].feeling;

                detail_div.html(detail_text);
                detail_div.slideToggle();
            },
            error:function () {
                alert('검색에 실패했습니다.');
            }
        })
    });
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
            var html = '';
            for(var i=0; i<data.result.length; i++) {
                var data_result = data.result[i];
                var url = "/feeling/search/"+encodeURIComponent(data_result['@rid']);
                html += '<a href="#" class="list-group-item" data-id='+data_result["@rid"]+'>'+data_result.title
                     +'<div class="detail" hidden>adsfadsfasdfadsfadsfasdfadf</div></a>';
            }
            // html += '</ul>';
            $('#select_result').html(html);
        },
        error:function () {
            alert('검색에 실패했습니다.');
        }
    })
};
