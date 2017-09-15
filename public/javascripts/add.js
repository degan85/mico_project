var result = 'aa';
$(document).ready(function(){

    $('#insertBtn').click(function() {
        var title = $('#title').val();
        var feeling = $('#feeling').val();

        check_validation(title, feeling);

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
                var result = data.result;
                if(result === 'false') {
                    alert('해당 노래가 이미 존재합니다.')
                }
                if(result === 'success') {
                    alert('저장되었습니다.');
                    location.href='/feeling'
                }

            },
            error: function() {
                 alert('입력중 오류가 발생하였습니다.');
            }
        })
    });

    $('#updateBtn').click(function() {
        var title = $('#title').val();
        var feeling = $('#feeling').val();

        check_validation(title, feeling);

        $.ajax({
            url: "/feeling/update",
            dataType: "json",
            type: "POST",
            data:
                {
                    title   :   title,
                    feeling :   feeling
                },
            success: function(data) {
                var result = data.result;
                if(result === 'success') {
                    alert('저장되었습니다.');
                    location.href='/feeling'
                }
            },
            error: function() {
                alert('입력중 오류가 발생하였습니다.');
            }
        })
    });
});

var check_validation = function (titie, feeling) {
    if(!title) {
        alert('타이틀을 입력해주세요');
        return;
    }
    if(!feeling) {
        alert('느낌을 입력해주세요');
        return;
    }

}