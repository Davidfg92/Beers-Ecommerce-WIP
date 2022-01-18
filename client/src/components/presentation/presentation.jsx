/* eslint-disable max-len */
import React from 'react';
import { Link } from 'react-router-dom';
import './presentation.css';

const Presentation = function () {
  return (
    <div className="body-presentation">
      <header className="header">
        <h1>Bienvenidos a Dabeers</h1>
      </header>
      {!localStorage.getItem('user') && (
        <div className="info-register">
          <p className="info-register__p">Para comprar cervezas necesitas registrarte. Para eso pulsa en el botón que aparece debajo.</p>
          <Link to="/register" key="register-button" className="info-register__button">Registrate</Link>
        </div>
      )}

      <div className="presentation">
        <h2 className="presentation__title">La leyenda de Gambrinus: el origen de la cerveza</h2>
        <div className="presentation__legend">
          <p className="presentation__p">
            Esta historia donde Gambrinus hace un trato con el diablo, se extrae de conjunto de cuentos cortos
            escritos por Charles Deulin llamados Contes d’un Bulgur de Cervical, es decir «Cuestas de un bebedor
            de cerveza». En esta historia, Cambrinus, el rey de la cerveza hack un pacto con el diablo.

          </p>

          <p className="presentation__p">
            El cuento habla sobre un joven, pobre pero apuesto, aprendiz de soplador de vidrio que se enamora
            de la hija de su jefe. Un amor no correspondido, dado su bajo estatus social, que le hace abandonar
            su ciudad, sólo acompañado de su violín.

          </p>

          <p className="presentation__p">
            Su talento musical fuera de las fronteras de su ciudad le hace tan popular
            que se ve obligado a regresar. Pero el concierto que ofrece a su pueblo se
            torna caótico produciendo altercados entre los asistentes. Encarcelado y al borde del suicidio,
            recibe la visita del Diablo, quien le ofrece una inmensa fortuna a cambio de su alma dentro de 30 años.

          </p>

          <p className="presentation__p">
            Gambrinus, a pesar de haberse convertido en una persona extremadamente rica, Flandrine le sigue rechazando
            por no ser nadie. Apesadumbrado, vuelve a pedirle ayuda al Diablo. Esta vez le enseña cómo hacer cerveza y
            le da semillas de lúpulo, además de una campanilla que hace bailar a todo el mundo.

          </p>

          <p className="presentation__p">
            Así, consiguió adentrarse completamente en el entorno de la alta sociedad, lo que haría que Flandrine se
            interesase finalmente por él. Como Gambrinus no volvió a declararse a Flandrine, ella fue a visitarle, pero él ya no la recordaba.

          </p>

          <p className="presentation__p">
            Tras 30 años de buena vida, el Diablo fue cobrar su deuda. Como Gambrinus tampoco lo reconoció,
            utilizó su campana que hace bailar a todos hasta desfallecer. El Diablo tuvo que rogar por el cese
            de la música que lo mantenía bailando involuntariamente. A cambio, le ofreció romper el contrato
            que requería su alma. Gambrinus paró la música y le dio un barril de cerveza con el que volvería al Infierno.

          </p>

          <p className="presentation__p">
            Durante 100 años, Cambrinus vivió en estado de embriaguez hasta el momento de su muerte.
            Y, aunque el Diablo volvió para recuperar el alma de Gambrinus, encontró un barril de cerveza en lugar
            de su cuerpo fallecido. Finalmente, acabó entendiendo que el alma del Rey de la Cerveza nunca podría ser suya.

          </p>
        </div>

      </div>
    </div>
  );
};

export default Presentation;
