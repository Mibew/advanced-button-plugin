(function(Mibew) {
    Mibew.APIFunctions.refreshButton = function(data) {
        // Refresh the button image (if exists)
        var button = document.getElementById("mibew-agent-button");
        if (!button) { return; }
        var img = button.getElementsByTagName("img")[0];
        if (!img) { return; }
        var originalSrc = img.src.replace(/&dummy=\d+/, '');
        img.src = originalSrc + "&dummy=" + (new Date()).getTime();

        // Hide the button if all popups are open or make it visible otherwise
        var visible = false;
        for(var key in Mibew.Objects.ChatPopups) {
            var popup = Mibew.Objects.ChatPopups[key];
            visible = visible || !popup.isOpened;
        }

        // Check whether we actually need to hide the button
        if (data.refreshButton.mode != 'none') {
            if (data.refreshButton.mode == 'visibility') {
                img.style.visibility = visible ? 'visible' : 'hidden';
            }
            else if (data.refreshButton.mode == 'display') {
                img.style.display = visible ? data.refreshButton.submode : 'none';
            }
        }

        // Set appropriate class for the button depending on its alleged visibility
        img.className = img.className.replace(/ mibew_(visible|hidden)/, '');
        if (visible) {
            img.className = img.className.concat(' mibew_visible');
        }
        else {
            img.className = img.className.concat(' mibew_hidden');
        }
    }
})(Mibew);
