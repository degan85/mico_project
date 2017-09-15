var result = 'aa';
$(document).ready(function(){

    var $class_list         = $('#classList');
    var $insert_button      = $('#insertBtn');
    var $update_button      = $('#updateBtn');
    var $alcoholKind        = $('#alcoholKind');
    var $feeling_alcohol    = $('.feeling.alcohol');
    var $feeling_wine       =$('.feeling.wine');

    $class_list.on('change', function () {
        // alert($class_list.val());
        $feeling_alcohol.hide();
        $feeling_wine.hide();
        if($class_list.val() === 'Food') {
            $feeling_alcohol.hide();
        }else if($class_list.val() === 'Alcohol') {
            $feeling_alcohol.hide();
            $feeling_wine.hide();
        }else if($class_list.val() === 'Music') {
            $feeling_alcohol.hide();
        }
    });

    $alcoholKind.on('change', function () {
        $feeling_wine.hide();
        if($alcoholKind.val() === '와인') {
            $feeling_wine.show();
        }
    });


    $insert_button.click(function() {
        var name = $('#name').val();
        var feeling = $('#feeling').val();
        var class_list = $('#classList').val();

        if(check_validation(name, feeling)) {
            $.ajax({
                url: "/feeling/add",
                dataType: "json",
                type: "POST",
                data:
                    {
                        name   :   name,
                        feeling :   feeling,
                        class_list : class_list
                    },
                success: function(data) {
                    var result = data.result;
                    if(result === 'false') {
                        alert('해당 이름이 이미 존재합니다.')
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
        };
    });

    $update_button.click(function() {
        var name = $('#name').val();
        var feeling = $('#feeling').val();

        check_validation(name, feeling);

        $.ajax({
            url: "/feeling/update",
            dataType: "json",
            type: "POST",
            data:
                {
                    name   :   name,
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

var check_validation = function (name, feeling) {
    if(!name) {
        alert('이름을 입력해주세요');
        return false;
    }
    if(!feeling) {
        alert('느낌을 입력해주세요');
        return false;
    }
    return true;
};