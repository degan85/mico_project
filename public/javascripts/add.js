var result = 'aa';
$(document).ready(function(){

    $('#insertBtn').click(function() {
        var title = $('#title').val();
        var feeling = $('#feeling').val();

        // if(!title) {
        //     alert('타이틀을 입력해주세요');
        //     return;
        // }
        // if(!feeling) {
        //     alert('느낌을 입력해주세요');
        //     return;
        // }

        // $('#output').val(a+b);
        // $.post(
        //     '/feeling/add',
        //     {a:a,b:b},
        //     function(data) {
        //         alert('return');
        //         $('#output').val(data.result);
        //     },
        //     'json'
        // );

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
                alert(data.result);
                result = data.result;
            },
            error: function() {
                // alert('error');
            }
        })
    });
});