(function(Mibew) {
    Mibew.APIFunctions.refreshButton = function(data) {
        // Refresh the button image
        var img = document.getElementById("mibew-agent-button").getElementsByTagName("img")[0];
        var originalSrc = img.src.replace(/&dummy=\d+/, '');
        img.src = originalSrc + "&dummy=" + (new Date()).getTime();

        // Check whether we need to hide the button
        if (data.refreshButton.mode != 'none') {
            // Hide the button if all popups are open or make it visible otherwise
            var visible = false;
            for(var key in Mibew.Objects.ChatPopups) {
                var popup = Mibew.Objects.ChatPopups[key];
                visible = visible || !popup.isOpened;
            }
            if (data.refreshButton.mode == 'visibility') {
                img.style.visibility = visible ? 'visible' : 'hidden';
            }
            else if (data.refreshButton.mode == 'display') {
                img.style.display = visible ? data.refreshButton.submode : 'none';
            }
        }
    }
})(Mibew);
