function optionsButtonsGame () {
const $containerHomeGame = document.querySelector('.container_Start')
const $containerCategoryGame = document.querySelector('.container_Body_Category');
const $containerComoJugar = document.querySelector('.container_ComoJugar');
const $containerGame = document.querySelector('.container_Body_Game');
const $buttonPlayGame = document.querySelector('.playGame_Button');
const $button_ComoJugar = document.querySelector('.button_ComoJugar');
const $returnHomeButton = document.querySelector('.returnHomeButton');
const $returnHomeButton_2 = document.querySelector('.returnHomeButton_2');
const $buttonGame_Continue = document.querySelector('.buttonGame_Continue')
const $buttonMenuGame = document.querySelector('.buttonMenuGame')
const $container_Body_Menu_Game = document.querySelector('.container_Body_Menu_Game');
const $game_Win = document.querySelector('.game_Win');
const $game_Loser = document.querySelector('.game_Loser');

    const containers = [$containerComoJugar, $containerCategoryGame, $containerGame, 
                        $container_Body_Menu_Game, $game_Win, $game_Loser];
    
        containers.forEach((container) => {
        container.classList.add('display_Container');
    })

    $buttonPlayGame.addEventListener('click', () => {
        $containerHomeGame.classList.add('display_Container');
        containers[1].classList.remove('display_Container')
    })

    $returnHomeButton.addEventListener('click', () => {
        $containerHomeGame.classList.remove('display_Container');
        containers[1].classList.add('display_Container')
    })

    $button_ComoJugar.addEventListener('click', () => {
        $containerHomeGame.classList.add('display_Container');
        containers[0].classList.remove('display_Container')
    })

    $returnHomeButton_2.addEventListener('click', () => {
        $containerHomeGame.classList.remove('display_Container');
        containers[0].classList.add('display_Container')
    })

    $buttonMenuGame.addEventListener('click', () => {
        $container_Body_Menu_Game.classList.remove('display_Container')
    })

    $buttonGame_Continue.addEventListener('click', () => {
        $container_Body_Menu_Game.classList.add('display_Container')
    })
}

optionsButtonsGame ()

async function obtenerCategoriasDeApi () {
    try {
        const api = await fetch('api/api.json');
        const api_Json = await api.json()
        
        const $card_Category = document.querySelectorAll('.card_Category');
        
        let agreeNamesCategories = []

        api_Json.categories.forEach(name => {
            agreeNamesCategories.push(name.name)
        })

       for(let i = 0; i < $card_Category.length; i++){
            $card_Category[i].textContent = agreeNamesCategories[i];
       }

    } catch (error) {
        console.log(error)

    }
}

async function elejirCategoria () {
    try {
        const api = await fetch('api/api.json');
        const api_Json = await api.json()
        const $card_Category = document.querySelectorAll('.card_Category');
        const $containerGame = document.querySelector('.container_Body_Game');
        const $containerCategoryGame = document.querySelector('.container_Body_Category');
        const $nameCategory = document.querySelector('.nameCategory');
        const $container_Letters_Complete = document.querySelector('.container_Letters_Complete');
        const $container_Body_Menu_Game = document.querySelector('.container_Body_Menu_Game');
        const $button_NewCategory = document.querySelector('.button_NewCategory');
        
        function obtenerNumeroAleatorio() {
            return Math.floor(Math.random() * 6) + 1;
        }

        let wordRandom = obtenerNumeroAleatorio()
        let agreeWord = []

        $card_Category.forEach((card, index) => {
            card.addEventListener('click', () => {
                    $containerCategoryGame.classList.add('display_Container')
                    $containerGame.classList.remove('display_Container')
                
                    let validarCategorie = api_Json.categories[index]
                
                    $nameCategory.textContent = validarCategorie.name
                    agreeWord.push(validarCategorie.words[wordRandom].word)
                    
                let word = agreeWord
                let array_Word = word[0]
                let new_Word = []
                let maxLetters = array_Word.length 
                
                for(let i = 0; i < maxLetters; i++){
                    const $letterAgreeVacio = document.createElement('div');
                    $letterAgreeVacio.classList.add('letterAgree');

                    $container_Letters_Complete.appendChild($letterAgreeVacio)
                }

                for(let i = 0; i < array_Word.length; i++){
                    new_Word.push(array_Word[i])
                }

                adininarPorLetra (new_Word)

                $button_NewCategory.addEventListener('click', () =>{
                    agreeWord = []
                    
                    wordRandom = obtenerNumeroAleatorio()
        
                    $container_Letters_Complete.innerHTML = '';
                    
                    $containerGame.classList.add('display_Container')
                    $containerCategoryGame.classList.remove('display_Container')
                    $container_Body_Menu_Game.classList.add('display_Container')
                })
            
            })
        })

    } catch (error) {
        
    }
}

function adininarPorLetra (word) {
    const $key_Keyboard = document.querySelectorAll('.card_key');
    const $health_ProgressBackground = document.querySelector('.health_ProgressBackground');
    const $letterAgree = document.querySelectorAll('.letterAgree');
    const $container_Body_Menu_Game = document.querySelector('.container_Body_Menu_Game');
    const $game_Win = document.querySelector('.game_Win');
    const $game_Loser = document.querySelector('.game_Loser');
    const $game_paused = document.querySelector('.game_paused');
    const $button_NewCategory = document.querySelector('.button_NewCategory');
    const $container_Letters_Complete = document.querySelector('.container_Letters_Complete');
    const $containerCategoryGame = document.querySelector('.container_Body_Category');
    const $containerGame = document.querySelector('.container_Body_Game');
    
    let intentIncorrect = 100

    $button_NewCategory.addEventListener('click', () =>{
        word = []
        $health_ProgressBackground.style.width = `${intentIncorrect = 100}%`
        $key_Keyboard.forEach((key) => {
            key.classList.remove('disable_Key')
            key.classList.add('card_key')
        })

        $container_Letters_Complete.innerHTML = '';
        
        $containerGame.classList.add('display_Container')
        $containerCategoryGame.classList.remove('display_Container')
        $container_Body_Menu_Game.classList.add('display_Container')
    })

    // const validarLetraVacia = word.findIndex(letter => letter.trim() === '');
    
    const indicesDeEspaciosVacios = word
    .map((char, index) => (char === ' ' ? index : -1))
    .filter(index => index !== -1);
    
    let agreeLettersNew = []

    $letterAgree.forEach((letter, index) => {
        agreeLettersNew.push(index)
    })

    for(let i = 0; i < indicesDeEspaciosVacios.length; i++){
        let pushSpace = agreeLettersNew.filter(letter => letter === indicesDeEspaciosVacios[i])
        
        $letterAgree[pushSpace].classList.remove('letterAgree')
        $letterAgree[pushSpace].classList.add('letterSpace')
        console.log(pushSpace)
    }
   

    for(let i = 0; i < $key_Keyboard.length; i++){
        $key_Keyboard[i].addEventListener('click', () => {
            const verificarSiExiste = word.findIndex(letter => letter === $key_Keyboard[i].textContent.trim().toLocaleUpperCase())

            if(verificarSiExiste === -1){
               intentIncorrect -= 20

               if (intentIncorrect < 1) {
                    $game_paused.classList.add('display_Container');
                    $container_Body_Menu_Game.classList.remove('display_Container');
                    $game_Loser.classList.remove('display_Container')
                }

               $health_ProgressBackground.style.width = `${intentIncorrect}%`
            }
            
            $key_Keyboard[i].classList.remove('card_key');
            $key_Keyboard[i].classList.add('disable_Key');
        })
    }

    letrasAdivinadasContador = 0;
    
    // b. CONTEO INICIAL DE REPETICIONES
    conteoLetrasRepetidas = {};
    for (const letra of word) {
        if (letra !== ' ') { 
            conteoLetrasRepetidas[letra] = (conteoLetrasRepetidas[letra] || 0) + 1;
        }
    }

    letrasAdivinadasContador += indicesDeEspaciosVacios.length;

    $key_Keyboard.forEach(key => {
        // Eliminar listeners previos para evitar que el evento se dispare N veces
        key.onclick = null; 
        
        key.addEventListener('click', () => {
            const letraTecleada = key.textContent.trim().toLocaleUpperCase();
            let acierto = false;

            // Iterar sobre la palabra para encontrar coincidencias
            word.forEach((correctLetter, index) => {
                if (correctLetter === letraTecleada) {
                    const letterElement = document.querySelectorAll('.container_Letters_Complete > div')[index];
                    if (letterElement) letterElement.textContent = letraTecleada;
                    acierto = true;
                    letrasAdivinadasContador++;
                }
            });

            if (acierto) {
                // Acierto: Comprobar repeticiones
                if (conteoLetrasRepetidas.hasOwnProperty(letraTecleada)) {
                    conteoLetrasRepetidas[letraTecleada]--; 

                    // Deshabilitar SÓLO si no quedan más repeticiones
                    if (conteoLetrasRepetidas[letraTecleada] <= 0) {
                        key.classList.remove('card_key');
                        key.classList.add('disable_Key');
                        key.disabled = true; 
                    }
                }
                
                // Comprobar Victoria
                if (letrasAdivinadasContador === word.length) {
                    // Muestra el mensaje de Ganador
                    if($game_paused) $game_paused.classList.add('display_Container')
                    if ($game_Win) $game_Win.classList.remove('display_Container');
                    if ($container_Body_Menu_Game) $container_Body_Menu_Game.classList.remove('display_Container');
                }
            } 
        });
    });
}

function buttonRestartGame () {
    const $button_restartGame = document.querySelector('.button_restartGame')

    $button_restartGame.addEventListener('click', () =>{
        location.reload(true);
    })
}

obtenerCategoriasDeApi ()
buttonRestartGame ()
elejirCategoria()