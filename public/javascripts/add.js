var result = 'aa';
$(document).ready(function(){

    $('#insertBtn').click(function() {
        var title = $('#title').val();
        var feeling = $('#feeling').val();

        if(!title) {
            alert('타이틀을 입력해주세요');
            return;
        }
        if(!feeling) {
            alert('느낌을 입력해주세요');
            return;
        }

        $.ajax({
            url: "/feeling/add",
            dataType: "json",
            type: "POST",
            data:
                {
                    title   :   title,
                    feeling :   feeling
                },
            success: function(data) {
                result = data.result;
                $('input').val('');
            },
            error: function() {
                 alert('입력중 오류가 발생하였습니다.');
            }
        })
    });
});