const arribaIzquierda = document.querySelector('.arriba-izquierda');
    const arribaDerecha = document.querySelector('.arriba-derecha');
    const abajoIzquierda = document.querySelector('.abajo-izquierda');
    const abajoDerecha = document.querySelector('.abajo-derecha');
    const coordenadasText = document.getElementById('coordenadas');

    webgazer.setGazeListener(function(data, elapsedTime) {
      if (data == null) {
        return;
      }

      // Cambiar el color de fondo según la posición de la mirada
      arribaIzquierda.style.backgroundColor = 'white';
      arribaDerecha.style.backgroundColor = 'white';
      abajoIzquierda.style.backgroundColor = 'white';
      abajoDerecha.style.backgroundColor = 'white';

      if (data.x < window.innerWidth / 2 && data.y < window.innerHeight / 2) {
        arribaIzquierda.style.backgroundColor = 'tomato';
      }

      if (data.x > window.innerWidth / 2 && data.y < window.innerHeight / 2) {
        arribaDerecha.style.backgroundColor = 'tomato';
      }

      if (data.x < window.innerWidth / 2 && data.y > window.innerHeight / 2) {
        abajoIzquierda.style.backgroundColor = 'tomato';
      }

      if (data.x > window.innerWidth / 2 && data.y > window.innerHeight / 2) {
        abajoDerecha.style.backgroundColor = 'tomato';
      }
    console.log("dflkgmdfgklmdfg")
     console.log(data.x);
     console.log(data.y);

      // Mover el cursor
      moveCursor(data.x, data.y);
    }).begin();

    let eyesClosedFrames = 0;
    let eyeCascade;

    function onOpenCvReady() {
      eyeCascade = new cv.CascadeClassifier();
      eyeCascade.load('haarcascade_eye.xml');

      // Puedes cargar otros clasificadores según sea necesario

      webgazer.setGazeListener(function (data, elapsedTime) {
        if (data == null) {
          return;
        }

        // Reiniciar el contador si se detecta la mirada
        if (eyesClosedFrames > 0) {
          eyesClosedFrames = 0;
        }

        // Detección de parpadeo
        const eyesRegion = new cv.Rect(data.x - 30, data.y - 15, 60, 30); // Ajustar según tu caso
        const gray = new cv.Mat();
        const eyes = new cv.Mat(video.height, video.width, cv.CV_8UC4);
        const roi = new cv.Mat(eyes, eyesRegion);

        cv.cvtColor(roi, gray, cv.COLOR_RGBA2GRAY);
        const eyesRects = new cv.RectVector();
        eyeCascade.detectMultiScale(gray, eyesRects);

        if (eyesRects.size() === 0) {
          eyesClosedFrames++;
          // Puedes ajustar el número de frames requeridos para considerar el parpadeo como cerrado
          if (eyesClosedFrames > 5) {
            console.log('Parpadeo detectado');
            // Aquí puedes realizar acciones adicionales al detectar el parpadeo
          }
        }

        gray.delete();
        eyesRects.delete();
      });
    }

    function moveCursor(x, y) {
      // Ajustar la velocidad de movimiento según tus necesidades
      const velocidad = 5;
      // Calcular la nueva posición del cursor
      const nuevaX = window.screenX + (x - window.innerWidth / 2) * velocidad;
      const nuevaY = window.screenY + (y - window.innerHeight / 2) * velocidad;
      // Establecer la nueva posición del cursor
      window.moveTo(nuevaX, nuevaY);
    }