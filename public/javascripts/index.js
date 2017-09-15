var select;
var result;
var edit;
/*
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

    $('#select_result').on('click','.detail-list',function () {
        select = $(this);
        var select_id = $(this).data('id');

        select_feeling(select_id);
    });
});


var select_feeling = function (select_id) {
    $.ajax({
        url:'/feeling/search/detail',
        dataType:'json',
        type:'POST',
        data:{select_id: select_id},
        success:function (rtn_data) {
            result = rtn_data;
            console.log(rtn_data);
            var data = result.result,
                rid = encodeURIComponent(data[0]['@rid']),
                name = encodeURIComponent(data[0].name),
                feeling = encodeURIComponent(data[1].feeling);

            var edit_url = '/feeling/add/'+ rid +'/'+ name +'/'+ feeling;
            var delete_url = '/feeling/delete/'+ rid +'/'+ name +'/'+ feeling;
            var detail_div = select.children();
            var detail_text=  '<br>'+data[0]['@class']+'</br>'
                + 'Feeling : <font color="#ff69b4">'+ data[1].feeling+'</font></br>'
                + '<div class="detail_feeling"><a href='+edit_url
                +' data-rid=' + rid
                +' data-name=' + name
                +' data-feeling=' + feeling
                +'>편집</a>'
                +'&nbsp&nbsp&nbsp&nbsp<a href='+delete_url+'>삭제</a>'
                +'</div>';

            detail_div.html(detail_text);
            detail_div.slideToggle();
        },
        error:function () {
            // alert('검색에 실패했습니다.');
        }
    })
};

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
                html += '<a href="#" class="list-group-item detail-list" data-id='+data_result["@rid"]+'>'+data_result.name
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


/*
    다중 사람 처리할 때
    다시 코딩해야 함
 */

// var edit_click = function (clicked_element) {
//     var rid = decodeURIComponent(clicked_element.data('rid')),
//         name = decodeURIComponent(clicked_element.data('name')),
//         feeling = decodeURIComponent(clicked_element.data('feeling'));
//
//     $.ajax({
//         url:'/feeling/search',
//         dataType:'json',
//         type:"POST",
//         data:
//             {
//                 rid     : rid,
//                 name   : name,
//                 feeling : feeling
//             },
//         success:function (data) {
//
//         },
//         error:function () {
//             alert('검색에 실패했습니다.');
//         }
//     })
// };

