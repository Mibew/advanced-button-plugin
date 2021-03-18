(function(Mibew) {
    Mibew.APIFunctions.refreshButton = function(data) {

        var button_object;

        var button = document.getElementById("mibew-agent-button");
        if (!button) {
            // The button is operator code field
            button_object = document.getElementById("mibew-operator-code-field");
        }
        else {
            button_object = button.getElementsByTagName("img")[0];
            if (!button_object) {
                // The button is text link
                button_object = button;
            }
            else {
                // The button is image, refresh it
                var originalSrc = button_object.src.replace(/&dummy=\d+/, '');
                button_object.src = originalSrc + "&dummy=" + (new Date()).getTime();
            }
        }

        // Unable to find button of any type - nothing to do
        if (!button_object) { return; }

        // Hide the button if all popups are open or make it visible otherwise
        var visible = false;
        for(var key in Mibew.Objects.ChatPopups) {
            var popup = Mibew.Objects.ChatPopups[key];
            visible = visible || !popup.isOpened;
        }

        // Check whether we actually need to hide the button
        if (data.refreshButton.mode != 'none') {
            if (data.refreshButton.mode == 'visibility') {
                button_object.style.visibility = visible ? 'visible' : 'hidden';
            }
            else if (data.refreshButton.mode == 'display') {
                button_object.style.display = visible ? data.refreshButton.submode : 'none';
            }
        }

        // Set appropriate class for the button depending on its alleged visibility
        button_object.className = button_object.className.replace(/ mibew_(visible|hidden)/, '');
        if (visible) {
            button_object.className = button_object.className.concat(' mibew_visible');
        }
        else {
            button_object.className = button_object.className.concat(' mibew_hidden');
        }
    }
})(Mibew);
