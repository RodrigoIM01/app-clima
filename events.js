const $buttonTemp = document.querySelectorAll('.buttonTemp');

$buttonTemp.forEach(function(button) {
    button.addEventListener('click', function(event) {
        if(!this.classList.contains('active')) {
            this.classList.add('active');
            // remove classList of other buttons
            $buttonTemp.forEach(function(button) {
                if(button !== this) {
                    button.classList.remove('active');
                }
            }.bind(this));
        }
    })
});