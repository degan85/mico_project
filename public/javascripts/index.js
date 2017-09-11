$(document).ready(function () {
    $('#serchBtn').click(function () {
        var searchTxt = document.getElementById('serch').value;
        var where_sql = "feeling like '%" + searchTxt.replace(/\s/g, "").replace(/,/g, "%' and feeling like '%") + "%')";

        $.ajax({
            url:'/feeling/search',
            dataType:'json',
            type:"POST",
            data:{where_sql:where_sql},
            success:function (data) {
                console.log(data);

                var html = '<ul>'
                for(var i=0; i<data.result.length; i++) {
                    html += '<li> 타이틀 : '+data.result[i].title+' , - '+data.result[i]["@class"]+'</li>';
                }
                html += '</ul>';
                $('#select_result').html(html);
            },
            error:function () {
                alert('검색에 실패했습니다.');
            }
        })
    });
});

// select feeling from E where @rid in (select inE() from Music where title='test3')