$(document).ready(function () {
    $('.button-collapse').sideNav();

    // define the modal
    $('#noteModal').modal({
    });

    // onclick for the buttons for each note
    $('.noteButton').on('click', function (noteRet) {

        // if we have a duplicate listener, stop it from listening
        noteRet.stopImmediatePropagation();

        // select button to work with
        var currentButton = $(this).attr('id');

        // call the popNote function for the button
        popNote(currentButton);

        // open the modal
        $('#noteModal').modal('open');

        // set up response of clicking the notebutton
        $('#noteButton').on('click', function (noteRet) {
            noteRet.preventDefault();

            // define the text we'll be saving
            var noteText = $('#noteText');

            $.post("/note/" + currentButton, $('#noteForm').serialize())
                .done(function (data) {
                    popNote(currentButton);
                })
                .fail(function (error) {
                    console.log("Cannot", error);
                });

            // empty out the note
            noteText.val('');

            return false;
        });
    });

    // function to read in notes
    function popNote(id) {

        // empty the div
        $('.messages').empty();

        // read the note
        $.get("/note/" + id, function (data) {

            // populate notes them
            for (var i = 0; i < data.length; i++) {
                var note = $(
                    '<li class="note collection-item">'
                    + '<p>'
                    + (i + 1) + '. ' + data[i].noteText + '</p>'
                    + '<button class="uniqueNoteButton waves-effect waves-light btn" data-currentButtonId="' + data[i]._id + '"><i class="material-icons right">delete</i> Delete #' + (i + 1) + '</button>'
                    + '</li>'
                );

                // append the note to the div
                $('.messages').append(note);
            }

        })
            .then(function () {

                // make a listener for deleting the notes
                $(".uniqueNoteButton").on("click", function () {

                    var currentButtonId = $(this).data(currentButtonId);


                    $.post("/deleteNote/" + currentButtonId.currentbuttonid, $('#noteForm').serialize())
                        .done(function (data) {

                            // after deleting the note, close the modal
                            $('#noteModal').modal('close');
                        })

                        .fail(function () {
                            console.log("Error: Cannot get notes");
                        });


                });
            })

    }

})