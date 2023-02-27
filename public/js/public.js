jQuery(document).ready(function ($){
    $(document).on('click', '.sb_attr_select', function (){
        $('.sb_attr_details').hide();
        var id = $(this).data('attribute');
        $('.sb_variation_details').find('#'+id).show();
        $('.sb_variation_details').addClass('sb_load');
        if(screen.width <= 767){
            $(".sb_variation_details").animate({"width":"90%"}, "slow");
        }
        else if(screen.width <= 992 && screen.width > 767){
            $(".sb_variation_details").animate({"width":"90%"}, "slow");
        }
        else{
            $(".sb_variation_details").animate({"width":"40%"}, "slow");
        }
        $(".sb_variation_details_main").animate({"width":"100%"}, "slow");
        $('.sb_variation_details_main').show();
        if(!$(this).hasClass('sb_variation_selected_main')){
            $(document).find('.sb_first_selection').remove();
            var main_attr = $(document).find('.sb_variation_selected_main').attr('data-attribute');
            var main_attr_val   = $(document).find('.sb_variation_selected_main').attr('data-attr_val');
            var current_attr    = $(this).attr('data-attribute');
            var current_val     = $(this).attr('data-attr_val');
            var pro_id          = $('#sb_main_product').val();
            var selected_attr   = $('.sb_variation_selected_main').attr('data-attribute');
            var sb_bg_img   = $('.sb_variation_selected_main').find('.sb_select_image').attr('data-img');
            var selected = selected_attr.replace("attribute_pa_", "");
            var first_attr = main_attr_val.replace("-", " ");
            // first_attr = first_attr.toUpperCase();
            // selected = selected.toUpperCase();
            var firstSelected = '<p class="sb_first_selection">Selected '+selected+' <span class="sb_bg_img" style="background-image: url('+sb_bg_img+')"></span><span>'+first_attr+'</span></p>';
            $(firstSelected).insertBefore('.variation_details[data-attribute="'+current_attr+'"]');
            jQuery.ajax({
                type: "POST",
                url: ajax_url.ajax,
                data: {
                    action: "sb_get_variations",
                    main_attr: main_attr,
                    main_attr_val: main_attr_val,
                    current_attr: current_attr,
                    pro_id: pro_id,
                },
                dataType: "json",
                cache: false,
                success: function (response) {
                    $('.variation_details[data-attribute="'+current_attr+'"]').empty();
                    for(var i=0; i < response.length; i++){
                        var res = response[i];
                        if(current_val == res){
                            var active = 'sb_active';
                        }
                        else{
                            var active = '';
                        }
                        $('.variation_details[data-attribute="'+current_attr+'"]').append('' +
                            '<div class="variation_details_a variation_details_other '+active+'" data-attribute="'+current_attr+'" data-attr_val="'+res+'" data-value="'+res+'">' +
                            '<p>'+res.replace(/[^a-zA-Z0-9 ]/g, " ")+'</p>' +
                            '</div>');
                        $('.sb_variation_details').removeClass('sb_load');
                    }
                }
            });
        }
        else{
            $('.sb_variation_details').removeClass('sb_load');
        }
    });
    function capitalize(s)
    {
        return s[0].toUpperCase() + s.slice(1);
    }
    $(document).on('click', '.sb-popin-close', function (){
        hide_variations_modal();
    })
    $(document).on('click', '.variation_details_a', function (e){
        e.preventDefault();
        $('.sb_variation_details').addClass('sb_load');
        $(this).closest('.entry-summary').append('<div class="blockUI blockOverlay sb_error" style="z-index: 1000; border: none; margin: 0px; padding: 0px; width: 100%; height: 100%; top: 0px; left: 0px; background: rgb(255, 255, 255); opacity: 0.465; cursor: default; position: absolute;"></div>');
        $(document).find('.sb_error').remove();
        $(this).closest('.sb_attr_details').find('.variation_details_a').removeClass('sb_active');
        $(this).addClass('sb_active');
        var value = $(this).data('value');
        var attr_val = $(this).data('attr_val');
        var id = $(this).data('attribute');
        $('.sb_attr_select_main[data-attribute='+id+']').attr('data-attr_val', attr_val);
        $('.sb_attr_select_main[data-attribute='+id+']').addClass('sb_variation_selected');
        $('.sb_attr_select_main[data-attribute='+id+']').find('.sb_selected_var').text(value);
        $('.sb_attr_select_main[data-attribute='+id+']').find('.sb_select_selected').text('Selected');
        if($(this).closest('.sb_attr_details').hasClass('sb_parent_active')){
            var img = $(this).attr('data-img');
            $('.sb_attr_select_main[data-attribute='+id+']').find('.sb_select_image').css('background', 'url('+img+')');
            $('.sb_attr_select_main[data-attribute='+id+']').find('.sb_select_image').attr('data-img', img);
            $('img[src="'+img+'"]').addClass('sb_here');
            $('.product-thumbs-slider .owl-item').each(function (){
                var link = $(this).find('img').attr('src');
                if(link == img){
                    $('.product-thumbs-slider .owl-item').removeClass('selected');
                    $(this).addClass('selected');
                    $(this).trigger('click');
                }
            });
        }
        //total vartiations
        var total = $(document).find('.sb_attr_select_main').length;
        //selected vartiations
        var selected = $(document).find('.sb_variation_selected').length;
        var variations = [];
        var attributes = [];
        $(document).find('.sb_variation_selected').each(function (){
            variations.push($(this).attr('data-attr_val'));
            attributes.push($(this).attr('data-attribute'));
        });
        var id = $('#sb_main_product').val();
        if(total == selected){
            sb_ajax_call_variations(ajax_url.ajax, id, variations, attributes, 'click');
        }
        else{
            hide_variations_modal();
            $('.sb_variation_details').removeClass('sb_load');
        }
        // $('.variation_details_a').removeClass('sb_active');
    })
    // $(document).load(function () {
    // });
    $(function() {
        // var active      = $(document).find('.sb_active');
        // var value       = $(active).attr('data-value');
        // var attr_val    = $(active).attr('data-attr_val');
        // var pro_id      = $('#sb_main_product').val();
        // var id          = $(active).data('attribute');
        // var img         = $(active).data('img');
        // $('.sb_attr_select_main[data-attribute='+id+']').attr('data-attr_val', attr_val);
        // $('.sb_attr_select_main[data-attribute='+id+']').addClass('sb_variation_selected sb_variation_selected_main');
        // $('.sb_attr_select_main[data-attribute='+id+']').find('.sb_selected_var').text(value);
        // $('.sb_attr_select_main[data-attribute='+id+']').find('.sb_select_image').css('background', 'url('+img+')');
        // setTimeout(function(){
        //     console.log('testing ', $('.product-thumbs-slider .owl-item').length);
        //     $('.img-thumbnail').each(function (){
        //         var _this = $(this);
        //         var link = _this.find('img').attr('src');
        //         if(link == img){
        //             $(this).parent().addClass('sahib007');
        //             $(this).closest('div').trigger('click');
        //             console.log('we are testing for the image', _this.attr('class'));
        //         }
        //         // console.log('we are testing ', link, img);
        //     });
        // }, 2000);
        // var variations  = [];
        // var attributes  = [];
        // $(document).find('.sb_active').each(function (){
        //     variations.push($(this).attr('data-attr_val'));
        //     attributes.push($(this).attr('data-attribute'));
        // });
        // console.log('we are here ', attr_val, id, value);
        // sb_ajax_call_variations(ajax_url.ajax, pro_id, variations, attributes, 'load')
    })
    //ajax call variations
    function sb_ajax_call_variations(ajax_url, id, variations, attributes, type){
        jQuery.ajax({
            type: "POST",
            url: ajax_url,
            data: {
                action:"sb_get_variation_id",
                id:id,
                variations:variations,
                attributes:attributes,
                type:type
            },
            dataType: "json",
            cache: false,
            success: function(response){
                if(response.code == 2.02){
                    var result = response.res;
                    for (const single of result) { // You can use `let` instead of `const` if you like
                        console.log(single);
                    }
                }
                else if(response.code == 2.01){
                    $(document).find('.single_add_to_cart_button').removeClass('wc-variation-selection-needed');
                    $(document).find('.single_add_to_cart_button').addClass('wc-variation-is-unavailable');
                    hide_variations_modal();
                    $('.sb_variation_details').removeClass('sb_load');
                }
                else{
                    $(document).find('.variation_id').val(response);
                    $(document).find('.single_add_to_cart_button').removeClass('disabled wc-variation-selection-needed wc-variation-is-unavailable');
                    hide_variations_modal();
                    $('.sb_variation_details').removeClass('sb_load');
                }
            }
        });
    }
    //Hide popup after ajax class and click on cross button
    function hide_variations_modal(){
        $(".sb_variation_details_main").animate({"width":"0"}, "slow");
        $(".sb_variation_details").animate({"width":"0"}, "slow");
        setTimeout(function (){
            $('.sb_variation_details_main').hide();
        }, 500);
        $('.sb_variation_details').removeClass('sb_load');
    }
    //filter of first variation
    $(document).on('click', '.sb_main_filter', function (e){
        $('.sb_main_filter').removeClass('sb_active_filter');
        var target = $(this).attr('data-target');
        if(target == 'all'){
            $('.variation_details_a').show();
        }
        else{
            $('.variation_details_a').hide();
            $('.'+target).show();
        }
        $(this).addClass('sb_active_filter');
    });
    var sb_page_load = function() {
        var active      = $(document).find('.sb_active');
        var value       = $(active).attr('data-value');
        var attr_val    = $(active).attr('data-attr_val');
        var pro_id      = $('#sb_main_product').val();
        var id          = $(active).data('attribute');
        var img         = $(active).data('img');
        $('.sb_attr_select_main[data-attribute='+id+']').attr('data-attr_val', attr_val);
        $('.sb_attr_select_main[data-attribute='+id+']').addClass('sb_variation_selected sb_variation_selected_main');
        $('.sb_attr_select_main[data-attribute='+id+']').find('.sb_selected_var').text(value);
        $('.sb_attr_select_main[data-attribute='+id+']').find('.sb_select_selected').text('Selected');
        $('.sb_attr_select_main[data-attribute='+id+']').find('.sb_select_image').css('background', 'url('+img+')');
        $('.sb_attr_select_main[data-attribute='+id+']').find('.sb_select_image').attr('data-img', img);

        $('.img-thumbnail').each(function (){
            var _this = $(this);
            var link = _this.find('img').attr('src');
            if(link == img){
                $(this).closest('div').trigger('click');
            }
        });
        $(document).find('.sb_page_load').remove();
    }
    window.onload = function($) {
        setTimeout(sb_page_load, 500);
    }
});