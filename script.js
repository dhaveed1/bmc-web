$(document).ready(() => {
  //validate email address
  $('#subscribe-form-email').keyup(() => {
    var email = $('#subscribe-form-email').val();

    if (email != 0) {
      if (!validateEmail(email)) {
        $('.input-wrap').css({
          border: '1px solid #ce1212',
        });
        $('#subscribe-button').prop('disabled', true);
      } else {
        $('.input-wrap').css({
          'border-width': '0px',
        });
        $('#subscribe-button').prop('disabled', false);
      }
    }
  });

  $('#subscribe-button').on('click', (e) => {
    e.preventDefault();
    var values = {};
    $.each($('form').serializeArray(), function (i, field) {
      values[field.name] = field.value;
    });

    if (validateEmail(values['email'])) {
      console.log(values);
      var reqSettings = {
        url: './include/subscribe.php',
        method: 'POST',
        timeout: 0,
        headers: {
          'Content-Type': 'application/json',
        },
        data: JSON.stringify(values),
      };
      $.ajax(reqSettings)
        .done((response) => {
          let res = JSON.parse(response);
          console.log(res.alert);
          if (res.alert === 'success') {
            // show success message
            Swal.fire({
              position: 'center',
              icon: res.alert,
              title: 'Nos encanta saber de tu interés!',
              text: 'Gracias por registrarte , te enviaremos un correo electrónico una semana antes de nuestro lanzamiento. Nos vemos pronto!',
              showConfirmButton: true,
            });
          } else {
            // show error message
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'An error occurred!',
              text: "An error occurred and we couldn't save your email.",
              showConfirmButton: true,
            });
          }
        })
        .fail((error) => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'An error occurred!',
            text: "An error occurred and we couldn't save your email.",
            showConfirmButton: true,
          });
          // console.error('An exception was caught while saving email ', error);
        });
    } else {
      $('.input-wrap').css({
        border: '1px solid #ce1212',
      });
      $('#subscribe-button').prop('disabled', true);
    }
  });

  $('#appPreviewSlide').on('slide.bs.carousel', function (evt) {
    var step = $(evt.relatedTarget).index();

    $('#slider_captions .carousel-caption:not(#caption-' + step + ')').fadeOut(
      'fast',
      function () {
        $('#caption-' + step).fadeIn();
      }
    );
  });

  const validateEmail = (emailAddress) => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    return pattern.test(emailAddress);
  };

  $('#contact-form').hide();

  $('#contact-trigger').on('click', function () {
    console.log('Trigger clicked');
    $('#contact-form').slideToggle();
  });
});
