$(document).on 'click', 'nav#primary > ul > li:not(.bottom) > a', (e) ->
  $(this).parent().siblings().removeClass('active')
  $(this).parent().addClass('active')

$(document).on 'click', 'nav#primary > ul > li > a', (e) ->
  if $(this).parent().find('ul').length > 0
    e.preventDefault()
