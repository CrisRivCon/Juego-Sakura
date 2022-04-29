var boton = document.getElementById("jugar");
            boton.addEventListener("click", function(event){
                location.href = "../PaginaInicio/index.html";
            });
            window.addEventListener("keypress", function(event){
                    if(event.keyCode == 13){
                        location.href = "../PaginaInicio/index.html";
                    }
                })