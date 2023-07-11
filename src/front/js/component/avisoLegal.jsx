import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import legal from "../../img/avisolegal.png";

export const AvisoLegal = (props) => {
  return (
    <Fragment>
      <div className="container-fluid rounded-5 justify-content-center rounded-5">
        <ul
          className="nav nav-pills mb-3 justify-content-center mt-2 p-2"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Aviso Legal
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              Política de Cookies
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-contact-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-contact"
              type="button"
              role="tab"
              aria-controls="pills-contact"
              aria-selected="false"
            >
              Política de Privacidad
            </button>
          </li>
        </ul>

        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabindex="0"
          >
            <div className="container-fluid card w-75 p-0 mb-4 shadow-sm p-3 mb-5 bg-body-tertiary rounded">
              <div className="row">
                <img src={legal} alt="legalidad BTFX" className="w-100" />
              </div>

              <div className="row col-auto p-1 m-1 ">
                <p className="text-break text-wrap text-justify fs-6 w-75 text-secondary-emphasis">
                  FEDERACIÓN VIZCAÍNA DE CICLISMO BIZKAIKO TXIRRINDULARITZA
                  FEDERAKUNDEA
                  <br />
                  <br />
                  01-02-2022
                  <br />
                  P. 1
                  <br />
                  <br />
                  FEDERACIÓN VIZCAÍNA DE CICLISMO BIZKAIKO TXIRRINDULARITZA
                  FEDERAKUNDEA CALLE MARTÍN BARÚA PICAZA, 27 – 2ª 48003 BILBAO
                  (Bizkaia)
                </p>

                <p className=" legalidad fs-6 w-100 text-secondary-emphasis  justify-content-center">
                  <span className="fw-bold">Aviso legal</span>
                  <br /> <br />
                  FEDERACIÓN VIZCAÍNA DE CICLISMO (BIZKAIKO TXIRRINDULARITZA
                  FEDERAKUNDEA),responsable del sitio web, en adelante
                  RESPONSABLE, pone a disposición de los usuarios el presente
                  documento, con el que pretende dar cumplimiento a las
                  obligaciones dispuestas en la Ley 34/2002, de 11 de julio, de
                  Servicios de la Sociedad de la Información y de Comercio
                  Electrónico (LSSICE), BOE N.º 166, así como informar a todos
                  los usuarios del sitio web respecto a cuáles son las
                  condiciones de uso. Toda persona que acceda a este sitio web
                  asume el papel de usuario, comprometiéndose a la observancia y
                  cumplimiento riguroso de las disposiciones aquí dispuestas,
                  así como a cualquier otra disposición legal que fuera de
                  aplicación. FEDERACIÓN VIZCAÍNA DE CICLISMO (BIZKAIKO
                  TXIRRINDULARITZA FEDERAKUNDEA) se reserva el derecho de
                  modificar cualquier tipo de información que pudiera aparecer
                  en el sitio web, sin que exista obligación de preavisar o
                  poner en conocimiento de los usuarios dichas
                  obligaciones,entendiéndose como suficiente la publicación en
                  su sitio web. 1. DATOS IDENTIFICATIVOS Nombre de dominio:
                  www.febici.eus Denominación social: FEDERACIÓN VIZCAÍNA DE
                  CICLISMO (BIZKAIKO TXIRRINDULARITZA FEDERAKUNDEA) CIF:
                  G48210884 Domicilio social: CALLE MARTÍN BARÚA PICAZA, 27 2ª
                  48003 BILBAO Teléfono: 944415049 E-mail: info@febici.eus
                  Inscrita en el Registro de Entidades deportivas del Gobierno
                  Vasco nº 89 2. CONDICIONES DE USO Y NAVEGACIÓN FEDERACIÓN
                  VIZCAÍNA DE CICLISMO (BIZKAIKO TXIRRINDULARITZA FEDERAKUNDEA)
                  realizará los máximos esfuerzos para que la navegación se
                  realice en las mejores condiciones y evitar los perjuicios de
                  cualquier tipo que pudieran ocasionarse durante la misma. Toda
                  persona que acceda a este sitio web asume el papel de usuario,
                  comprometiéndose a la observancia y cumplimiento riguroso de
                  las disposiciones aquí dispuestas, así como a cualquier otra
                  disposición legal que fuera de aplicación. FEDERACIÓN VIZCAÍNA
                  DE CICLISMO (BIZKAIKO TXIRRINDULARITZA FEDERAKUNDEA) no se
                  hace responsable de los perjuicios, de cualquier índole, que
                  pudieran ocasionarse a los usuarios por la utilización de
                  otros navegadores o versiones distintas de los navegadores
                  para los que ha sido diseñado el Sitio. 3. DERECHOS DE
                  PROPIEDAD INTELECTUAL E INDUSTRIAL FEDERACIÓN VIZCAÍNA DE
                  CICLISMO BIZKAIKO TXIRRINDULARITZA FEDERAKUNDEA 01-02-2022 P.
                  2 FEDERACIÓN VIZCAÍNA DE CICLISMO BIZKAIKO TXIRRINDULARITZA
                  FEDERAKUNDEA CALLE MARTÍN BARÚA PICAZA, 27 – 2ª 48003 BILBAO
                  (Bizkaia) El sitio web, incluyendo a título enunciativo pero
                  no limitativo su programación, edición, compilación y demás
                  elementos necesarios para su funcionamiento, los diseños,
                  logotipos, texto y/o gráficos, son propiedad del Responsable
                  o, si es el caso, dispone de licencia o autorización expresa
                  por parte de los autores. Todos los contenidos del sitio web
                  se encuentran debidamente protegidos por la normativa de
                  propiedad intelectual e industrial, así como inscritos en los
                  registros públicos correspondientes. Independientemente de la
                  finalidad para la que fueran destinados, la reproducción total
                  o parcial, uso, explotación, distribución y comercialización,
                  requiere en todo caso la autorización escrita previa por parte
                  del Responsable. Cualquier uso no autorizado previamente se
                  considera un incumplimiento grave de los derechos de propiedad
                  intelectual o industrial del autor. Los diseños, logotipos,
                  texto y/o gráficos ajenos al Responsable y que pudieran
                  aparecer en el sitio web, pertenecen a sus respectivos
                  propietarios, siendo ellos mismos responsables de cualquier
                  posible controversia que pudiera suscitarse respecto a los
                  mismos. El Responsableautoriza expresamente a que terceros
                  puedan redirigir directamente a los contenidos concretos del
                  sitio web, y en todo caso redirigir al sitio web principal de
                  www.febici.eus. El Responsable reconoce a favor de sus
                  titulares los correspondientes derechos de propiedad
                  intelectual e industrial, no implicando su sola mención o
                  aparición en el sitio web la existencia de derechos o
                  responsabilidad alguna sobre los mismos, como tampoco
                  respaldo, patrocinio o recomendación por parte del mismo. Para
                  realizar cualquier tipo de observación respecto a posibles
                  incumplimientos de los derechos de propiedad intelectual o
                  industrial, así como sobre cualquiera de los contenidos del
                  sitio web, puede hacerlo a través del correo electrónico
                  info@febici.eus. 4. RESPONSABILIDADES El Responsable no
                  garantiza el acceso continuado, ni la correcta visualización,
                  descarga o utilidad de los elementos e informaciones del sitio
                  web Asimismo, tampoco se hace responsable de las decisiones
                  que pudieran adoptarse como consecuencia del acceso a los
                  contenidos o informaciones ofrecidas. El Responsable podrá
                  interrumpir el servicio o resolver de modo inmediato la
                  relación con el usuario si detecta que un uso de su Sitio Web
                  es contrario a las presentes Condiciones Generales de Uso.
                  FEDERACIÓN VIZCAÍNA DE CICLISMO (BIZKAIKO TXIRRINDULARITZA
                  FEDERAKUNDEA)no se hace responsable por daños, perjuicios,
                  pérdidas, reclamaciones derivados del uso del Sitio Web.El
                  Responsable excluye cualquier responsabilidad por los daños y
                  perjuicios de toda naturaleza que pudieran deberse a la mala
                  utilización por parte de los Usuarios de Sitio Web. El acceso
                  a este sitio es responsabilidad exclusiva de los usuarios, los
                  riesgos derivados de la utilización del sitio por el usuario
                  serán a su único y exclusivo cargo. No es objeto de garantía
                  por parte del Responsable (i) la infalibilidad, la
                  disponibilidad, la continuidad, la inexistencia de
                  deficiencias y la seguridad del sitio; (ii) que el contenido
                  del sitio o la información que se transmite a través de él,
                  esté libre de virus o de otros elementos lesivos así como de
                  errores, omisiones o incorrecciones; (iii) la seguridad en la
                  utilización que el usuario haga del sitio FEDERACIÓN VIZCAÍNA
                  DE CICLISMO BIZKAIKO TXIRRINDULARITZA FEDERAKUNDEA 01-02-2022
                  P. 3 FEDERACIÓN VIZCAÍNA DE CICLISMO BIZKAIKO TXIRRINDULARITZA
                  FEDERAKUNDEA CALLE MARTÍN BARÚA PICAZA, 27 – 2ª 48003 BILBAO
                  (Bizkaia) 5. POLÍTICA DE COOKIES Este sitio web puede utilizar
                  cookies técnicas (pequeños archivos de información que el
                  servidor envía al ordenador de quien accede a la página) para
                  llevar a cabo determinadas funciones que son consideradas
                  imprescindibles para el correcto funcionamiento y
                  visualización del sitio. Las cookies utilizadas tienen, en
                  todo caso, carácter temporal, con la única finalidad de hacer
                  más eficaz la navegación, y desaparecen al terminar la sesión
                  del usuario. En ningún caso, estas cookies proporcionan por sí
                  mismas datos de carácter personal y no se utilizarán para la
                  recogida de los mismos. Mediante el uso de cookies también es
                  posible que el servidor donde se encuentra la web reconozca el
                  navegador utilizado por el usuario con la finalidad de que la
                  navegación sea más sencilla, permitiendo, por ejemplo, el
                  acceso de los usuarios que se hayan registrado previamente a
                  las áreas, servicios, promociones o concursos reservados
                  exclusivamente a ellos sin tener que registrarse en cada
                  visita. También se pueden utilizar para medir la audiencia,
                  parámetros de tráfico, controlar el progreso y número de
                  entradas, etc., siendo en estos casos cookies prescindibles
                  técnicamente, pero beneficiosas para el usuario. Este sitio
                  web no instalará cookies prescindibles sin el consentimiento
                  previo del usuario. El usuario tiene la posibilidad de
                  configurar su navegador para ser alertado de la recepción de
                  cookies y para impedir su instalación en su equipo. Por favor,
                  consulte las instrucciones de su navegador para ampliar esta
                  información. 6. POLÍTICA DE ENLACES Desde el sitio web, es
                  posible que se redirija a contenidos de terceros sitios web.
                  Dado que el Responsable no puede controlar siempre los
                  contenidos introducidos por terceros en sus respectivos sitios
                  web, no asume ningún tipo de responsabilidad respecto a dichos
                  contenidos. En todo caso, procederá a la retirada inmediata de
                  cualquier contenido que pudiera contravenir la legislación
                  nacional o internacional, la moral o el orden público,
                  procediendo a la retirada inmediata de la redirección a dicho
                  sitio web, poniendo en conocimiento de las autoridades
                  competentes el contenido en cuestión. El Responsable no se
                  hace responsable de la información y contenidos almacenados, a
                  título enunciativo pero no limitativo, en foros, chats,
                  generadores de blogs, comentarios, redes sociales o cualquier
                  otro medio que permita a terceros publicar contenidos de forma
                  independiente en la página web del Responsable. Sin embargo, y
                  en cumplimiento de lo dispuesto en los artículos 11 y 16 de la
                  LSSICE, se pone a disposición de todos los usuarios,
                  autoridades y fuerzas de seguridad, colaborando de forma
                  activa en la retirada o, en su caso, bloqueo de todos aquellos
                  contenidos que puedan afectar o contravenir la legislación
                  nacional o internacional, los derechos de terceros o la moral
                  y el orden público. En caso de que el usuario considere que
                  existe en el sitio web algún contenido que pudiera ser
                  susceptible de esta clasificación, se ruega lo notifique de
                  forma inmediata al administrador del sitio web. Este sitio web
                  se ha revisado y probado para que funcione correctamente. En
                  principio, puede garantizarse el correcto funcionamiento los
                  365 días del año, 24 horas al día. Sin embargo, el Responsable
                  no descarta la posibilidad de que existan ciertos errores de
                  programación, o que acontezcan causas de fuerza mayor,
                  catástrofes naturales, huelgas o circunstancias semejantes que
                  hagan imposible el acceso al sitio web. 7. DIRECCIONES IP Los
                  servidores del sitio web podrán detectar de manera automática
                  la dirección IP y el nombre de dominio utilizados por el
                  usuario. Una dirección IP es un número asignado
                  automáticamente a un ordenador cuando este se conecta a
                  Internet. Toda esta información se registra en un fichero de
                  actividad del servidor que permite el posterior procesamiento
                  de los datos con el fin de obtener mediciones únicamente
                  estadísticas que permitan conocer el número de impresiones de
                  páginas, el número de visitas realizadas a los servidores web,
                  el orden de visitas, el punto de acceso, etc. 8. LEY APLICABLE
                  Y JURISDICCIÓN Para la resolución de todas las controversias o
                  cuestiones relacionadas con el presente sitio web o de las
                  actividades en él desarrolladas, será de aplicación la
                  legislación española, a los Juzgados y Tribunales que en su
                  caso, sean competentes.
                </p>
              </div>
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabindex="0"
          >
            <div className="container-fluid card w-75 p-0 mb-4 shadow-sm p-3 mb-5 bg-body-tertiary rounded">
              <div className="row">
                <img src={legal} alt="legalidad BTFX" className="w-100" />
              </div>

              <div className="row col-auto p-1 m-1 ">
                <p className="text-break text-wrap text-justify fs-6 w-75 text-secondary-emphasis">
                  FEDERACIÓN VIZCAÍNA DE CICLISMO BIZKAIKO TXIRRINDULARITZA
                  FEDERAKUNDEA
                  <br />
                  <br />
                  01-02-2022
                  <br />
                  P. 1
                  <br />
                  <br />
                  FEDERACIÓN VIZCAÍNA DE CICLISMO BIZKAIKO TXIRRINDULARITZA
                  FEDERAKUNDEA CALLE MARTÍN BARÚA PICAZA, 27 – 2ª 48003 BILBAO
                  (Bizkaia)
                </p>

                <p className=" legalidad fs-6 w-100 text-secondary-emphasis  justify-content-center">
                  <span className="fw-bold">POLÍTICA DE COOKIES</span>
                  <br /> <br />
                  INFORMACIÓN SOBRE COOKIES Conforme con la Ley 34/2002, de 11
                  de julio, de servicios de la sociedad de la información y de
                  comercio electrónico (LSSI), en relación con el Reglamento
                  (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de
                  abril de 2016, General de Protección de Datos (GDPR) y la Ley
                  Orgánica 3/2018, de 5 de diciembre, de Protección de Datos y
                  Garantía de los Derechos Digitales (LOPDGDD), es obligado
                  obtener el consentimiento expreso del usuario de todas las
                  páginas web que usan cookies prescindibles, antes de que este
                  navegue por ellas. ¿QUÉ SON LAS COOKIES? Las cookies y otras
                  tecnologías similares tales como local shared objects, flash
                  cookies o píxeles, son herramientas empleadas por los
                  servidores Web para almacenar y recuperar información acerca
                  de sus visitantes, así como para ofrecer un correcto
                  funcionamiento del sitio. Mediante el uso de estos
                  dispositivos se permite al servidor Web recordar algunos datos
                  concernientes al usuario, como sus preferencias para la
                  visualización de las páginas de ese servidor, nombre y
                  contraseña, productos que más le interesan, etc. COOKIES
                  AFECTADAS POR LA NORMATIVA Y COOKIES EXCEPTUADAS Según la
                  directiva de la UE, las cookies que requieren el
                  consentimiento informado por parte del usuario son las cookies
                  de analítica y las de publicidad y afiliación, quedando
                  exceptuadas las de carácter técnico y las necesarias para el
                  funcionamiento del sitio web o la prestación de servicios
                  expresamente solicitados por el usuario. TIPOS DE COOKIES
                  SEGÚN LA FINALIDADCookies técnicas y funcionales: son aquellas
                  que permiten al usuario la navegación a través de una página
                  web, plataforma o aplicación y la utilización de las
                  diferentes opciones o servicios que en ella existan . Cookies
                  analíticas: son aquellas que permiten al responsable de las
                  mismas el seguimiento y análisis del comportamiento de los
                  usuarios de los sitios web a los que están vinculadas. La
                  información recogida mediante este tipo de cookies se utiliza
                  en la medición de la actividad de los sitios web, aplicación o
                  plataforma y para la elaboración de perfiles de navegación de
                  los usuarios de dichos sitios, aplicaciones y plataformas, con
                  el fin de introducir mejoras en función del análisis de los
                  datos de uso que hacen los usuarios del servicio. Cookies
                  publicitarias: son aquellas que permiten la gestión, de la
                  forma más eficaz posible, de los espacios publicitarios que,
                  en su caso, el editor haya incluido en una página web,
                  aplicación o plataforma desde la que presta el servicio
                  solicitado en base a criterios como el contenido editado o la
                  frecuencia en la que se muestran los anuncios. Cookies de
                  publicidad comportamental: recogen información sobre las
                  preferencias y elecciones personales del usuario (
                  retargeting) para permitir la gestión, de la forma más eficaz
                  posible, de los espacios publicitarios que, en su caso, el
                  editor haya incluido en una página web, aplicación o
                  plataforma desde la que presta el servicio solicitado. Cookies
                  sociales: son establecidas por las plataformas de redes
                  sociales en los servicios para permitirle compartir contenido
                  con sus amigos y redes. Las plataformas de medios sociales
                  tienen la capacidad de rastrear su actividad FEDERACIÓN
                  VIZCAÍNA DE CICLISMO BIZKAIKO TXIRRINDULARITZA FEDERAKUNDEA
                  01-02-2022 P. 2 FEDERACIÓN VIZCAÍNA DE CICLISMO BIZKAIKO
                  TXIRRINDULARITZA FEDERAKUNDEA CALLE MARTÍN BARÚA PICAZA, 27 –
                  2ª 48003 BILBAO (Bizkaia) en línea fuera de los Servicios.
                  Esto puede afectar al contenido y los mensajes que ve en otros
                  servicios que visita. Cookies de afiliados: permiten hacer un
                  seguimiento de las visitas procedentes de otras webs, con las
                  que el sitio web establece un contrato de afiliación (empresas
                  de afiliación). Cookies de seguridad: almacenan información
                  cifrada para evitar que los datos guardados en ellas sean
                  vulnerables a ataques maliciosos de terceros. SEGÚN LA
                  PROPIEDADCookies propias: son aquellas que se envían al equipo
                  terminal del usuario desde un equipo o dominio gestionado por
                  el propio editor y desde el que se presta el servicio
                  solicitado por el usuario. Cookies de terceros: son aquellas
                  que se envían al equipo terminal del usuario desde un equipo o
                  dominio que no es gestionado por el editor, sino por otra
                  entidad que trata los datos obtenidos través de las cookies.
                  SEGÚN EL PLAZO DE CONSERVACIÓNCookies de sesión: son un tipo
                  de cookies diseñadas para recabar y almacenar datos mientras
                  el usuario accede a una página web. Cookies persistentes: son
                  un tipo de cookies en el que los datos siguen almacenados en
                  el terminal y pueden ser accedidos y tratados durante un
                  período definido por el responsable de la cookie, y que puede
                  ir de unos minutos a varios años. TRATAMIENTO DE DATOS
                  PERSONALES FEDERACIÓN VIZCAÍNA DE CICLISMO BIZKAIKO
                  TXIRRINDULARITZA FEDERAKUNDEA es el Responsable del
                  tratamiento de los datos personales del Interesado y le
                  informa de que estos datos serán tratados de conformidad con
                  lo dispuesto en el Reglamento (UE) 2016/679, de 27 de abril de
                  2016 (GDPR), por lo que se le facilita la siguiente
                  información del tratamiento: Fines del tratamiento: según se
                  especifica en el apartado de cookies que se utilizan en este
                  sitio web. Legitimación del tratamiento: por consentimiento
                  del interesado (art. 6.1 GDPR). Criterios de conservación de
                  los datos: según se especifica en el apartado de cookies
                  utilizadas en la web. Comunicación de los datos: no se
                  comunicarán los datos a terceros, excepto en cookies propiedad
                  de terceros o por obligación legal. Derechos que asisten al
                  Interesado: – Derecho a retirar el consentimiento en cualquier
                  momento. – Derecho de acceso, rectificación, portabilidad y
                  supresión de sus datos, y de limitación u oposición a su
                  tratamiento. – Derecho a presentar una reclamación ante la
                  Autoridad de control (www.aepd.es) si considera que el
                  tratamiento no se ajusta a la normativa vigente. Datos de
                  contacto para ejercer sus derechos: FEDERACIÓN VIZCAÍNA DE
                  CICLISMO BIZKAIKO TXIRRINDULARITZA FEDERAKUNDEA. CALLE MARTÍN
                  BARÚA PICAZA, 27 2ª – 48003 BILBAO (Bizkaia). E-mail:
                  info@febici.eus FEDERACIÓN VIZCAÍNA DE CICLISMO BIZKAIKO
                  TXIRRINDULARITZA FEDERAKUNDEA 01-02-2022 P. 3 FEDERACIÓN
                  VIZCAÍNA DE CICLISMO BIZKAIKO TXIRRINDULARITZA FEDERAKUNDEA
                  CALLE MARTÍN BARÚA PICAZA, 27 – 2ª 48003 BILBAO (Bizkaia)
                  COOKIES UTILIZADAS EN ESTE SITIO WEB COOKIES CONTROLADAS POR
                  EL EDITOR Técnicas y funcionales Propiedad Cookie Finalidad
                  Plazo febici.eus _icl_current_langu age Se utiliza para
                  recordar el idioma que ha seleccionado el usuario y mostrarle
                  los contenidos en ese mismo idioma a lo largo de su navegación
                  en 22 horas febici.eus cdp-cookies- plugin-wp Cookie necesaria
                  para la utilización de las opciones y servicios del sitio web
                  en un año COOKIES DE TERCEROS Los servicios de terceros son
                  ajenos al control del editor. Los proveedores pueden modificar
                  en todo momento sus condiciones de servicio, finalidad y
                  utilización de las cookies, etc. Proveedores externos de este
                  sitio web: No se instalan cookies controladas por terceros
                  PANEL DE CONFIGURACIÓN DE COOKIES Desde este panel podrá
                  configurar las cookies que el sitio web puede instalar en su
                  navegador, excepto las cookies técnicas o funcionales que son
                  necesarias para la navegación y la utilización de las
                  diferentes opciones o servicios que se ofrecen. Panel de
                  cookies CÓMO GESTIONAR LAS COOKIES DESDE EL NAVEGADOR Eliminar
                  las cookies del dispositivo Las cookies que ya están en un
                  dispositivo se pueden eliminar borrando el historial del
                  navegador, con lo que se suprimen las cookies de todos los
                  sitios web visitados. Sin embargo, también se puede perder
                  parte de la información guardada (por ejemplo, los datos de
                  inicio de sesión o las preferencias de sitio web). Gestionar
                  las cookies específicas del sitio Para tener un control más
                  preciso de las cookies específicas de cada sitio, los usuarios
                  pueden ajustar su configuración de privacidad y cookies en el
                  navegador.
                </p>
              </div>
            </div>
          </div>

          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
            tabindex="0"
          >
            <div className="container-fluid card w-75 p-0 mb-4 shadow-sm p-3 mb-5 bg-body-tertiary rounded">
              <div className="row">
                <img src={legal} alt="legalidad BTFX" className="w-100" />
              </div>

              <div className="row col-auto p-1 m-1 ">
                <p className="text-break text-wrap text-justify fs-6 w-75 text-secondary-emphasis">
                  FEDERACIÓN VIZCAÍNA DE CICLISMO BIZKAIKO TXIRRINDULARITZA
                  FEDERAKUNDEA <br />
                  <br />
                  01-02-2022
                </p>

                <p className=" legalidad fs-6 w-100 text-secondary-emphasis  justify-content-center">
                  P. 1 <br />
                  FEDERACIÓN VIZCAÍNA DE CICLISMO BIZKAIKO TXIRRINDULARITZA
                  FEDERAKUNDEA CALLE MARTÍN BARÚA PICAZA, 27 – 2ª 48003 BILBAO
                  (Bizkaia) Política de Privacidad 1. INFORMACIÓN AL USUARIO En
                  esta Política de Privacidad podrás encontrar toda la
                  información relevante sobre el uso que hacemos de los datos
                  personales de nuestros usuarios, con independencia del canal o
                  medio (online o en persona) que utilices para interactuar con
                  nosotros. Ponemos a tu disposición de forma permanente toda la
                  información en esta Política de Privacidad que puedes
                  consultar cuando lo estimes oportuno. También encontrarás
                  información sobre cada tratamiento de tus datos personales
                  conforme vayas interactuando con nosotros. Cuando hablamos de
                  nuestro sitio web, nos referiremos a cualquiera de los canales
                  o medios digitales o en persona que hayas utilizado para
                  interactuar con nosotros, siendo los principales: Nuestra web:
                  https://www.febici.eus y correo electrónico: info@febici.eus
                  ¿Quién es el responsable del tratamiento de tus datos
                  personales? FEDERACIÓN VIZCAÍNA DE CICLISMO (BIZKAIKO
                  TXIRRINDULARITZA FEDERAKUNDEA) es el Responsable del
                  tratamiento de los datos personales del USUARIO y le informa
                  de que estos datos serán tratados de conformidad con lo
                  dispuesto en el Reglamento (UE) 2016/679, de 27 de abril
                  (GDPR), y la Ley Orgánica 3/2018, de 5 de diciembre (LOPDGDD).
                  ¿Para qué tratamos sus datos personales? Tratamos sus datos
                  para gestionar las siguienyes finalidades: Gestionar el envío
                  de la información que nos solicite a través de cualquiera de
                  las formas de contacto que se ponen a su disposición. La
                  tramitación y gestión de la de los distintos servicios que
                  solicitan a través de la página web, como son: -La solicitud y
                  renovación de licencia a través de la plataforma RFEC (alta
                  como club, equipo, licencia individual,etc..) -Inscripciones
                  campeonatos, escuelas, etc.. La publicación de las
                  clasificaciones La interacción del Responsable con los
                  usuarios de redes sociales.FEDERACIÓN VIZCAÍNA DE CICLISMO
                  (BIZKAIKO TXIRRINDULARITZA FEDERAKUNDEA), se exonera de
                  cualquier tipo de responsabilidad derivada por comentarios de
                  los usuarios y seguidores en sus redes sociales. La posible
                  realización de estadísticas de uso ¿Porqué tratamos sus datos?
                  La base legal es el consentimiento del Usuario al solicitar
                  los distintos servicios interés legítimo del Responsable
                  basado en Art. 6.1.f del RGPD y en las funciones públicas que
                  tiene encomendadas en virtud de la normativa del deporte, así
                  como el consentimiento del Usuario cuando sea preceptivo.
                  ¿Durante cuánto tiempo guardaremos tus datos personales? Se
                  conservarán durante no más tiempo del necesario para mantener
                  el fin del tratamiento o existan prescripciones legales que
                  dictaminen su custodia y cuando ya no sea necesario para ello,
                  se suprimirán con medidas de seguridad adecuadas para
                  garantizar la anonimización de los datos o la destrucción
                  total de los mismos. ¿A quién facilitamos sus datos
                  personales? FEDERACIÓN VIZCAÍNA DE CICLISMO BIZKAIKO
                  TXIRRINDULARITZA FEDERAKUNDEA 01-02-2022 P. 2 FEDERACIÓN
                  VIZCAÍNA DE CICLISMO BIZKAIKO TXIRRINDULARITZA FEDERAKUNDEA
                  CALLE MARTÍN BARÚA PICAZA, 27 – 2ª 48003 BILBAO (Bizkaia) No
                  está prevista ninguna comunicación de datos personales a
                  terceros salvo, si fuese necesario para el desarrollo y
                  ejecución de las finalidades del tratamiento, a nuestros
                  proveedores de servicios relacionados con comunicaciones, con
                  los cuales el Responsable tiene suscritos los contratos de
                  confidencialidad y de encargado de tratamiento exigidos por la
                  normativa vigente de privacidad. ¿Cuáles son tus derechos? Los
                  derechos que asisten al Usuario son: Derecho a retirar el
                  consentimiento en cualquier momento. Derecho de acceso: puedes
                  pedir información de aquellos datos personales que dispongamos
                  acerca de ti. Derecho de rectificación: puedes comunicar
                  cualquier cambio en tus datos personales Derecho de supresión
                  y al olvido: puedes solicitar la eliminación previo bloqueo de
                  los datos personales. Derecho de limitación al tratamiento:
                  supone la restricción del tratamiento de los datos personales.
                  Derecho a presentar una reclamación ante la autoridad de
                  control (www.aepd.es) si considera que el tratamiento no se
                  ajusta a la normativa vigente Datos de contacto para ejercer
                  sus derechos: FEDERACIÓN VIZCAÍNA DE CICLISMO (BIZKAIKO
                  TXIRRINDULARITZA FEDERAKUNDEA) CALLE MARTÍN BARÚA PICAZA, 27
                  2ª – 48003 BILBAO (VIZCAYA). E-mail: info@febici.eus 2.
                  CARÁCTER OBLIGATORIO DE LA INFORMACIÓN FACILITADA POR EL
                  USUARIO Los usuarios mediante la entrada de datos en los
                  campos correspondientes en el formulario de contacto, aceptan
                  expresamente y de forma libre e inequívoca, que sus datos son
                  necesarios para atender su petición. El usuario garantiza que
                  los datos personales facilitados son veraces y se hace
                  responsable de comunicar cualquier modificación de los mismos.
                  Confecciones Este S.L., informa de que todos los datos
                  solicitados a través del sitio web son obligatorios, ya que
                  son necesarios para la prestación de un servicio óptimo al
                  usuario. En caso de que no se faciliten todos los datos, no se
                  garantiza que la información y servicios facilitados sean
                  completamente ajustados a sus necesidades. 3. MEDIDAS DE
                  SEGURIDAD FEDERACIÓN VIZCAÍNA DE CICLISMO (BIZKAIKO
                  TXIRRINDULARITZA FEDERAKUNDEA), ha adoptado los niveles de
                  seguridad de protección de los datos personales legalmente
                  requeridos, y procura instalar aquellos medios y medidas
                  técnicas adicionales a su alcance para evitar la pérdida, mal
                  uso, alteración, acceso no autorizado y robo de los datos
                  personales facilitados. No obstante, el Usuario debe ser
                  consciente de que las medidas de seguridad en Internet no son
                  inexpugnables. Por ello,FEDERACIÓN VIZCAÍNA DE CICLISMO
                  (BIZKAIKO TXIRRINDULARITZA FEDERAKUNDEA), no será responsable
                  de hipotéticos daños o perjuicios que se pudieran derivar de
                  interferencias, omisiones, interrupciones, virus informáticos,
                  averías telefónicas o desconexiones en el funcionamiento
                  operativo de este sistema electrónico, motivadas por causas
                  ajenas a la misma, así como de retrasos o bloqueos en el uso
                  del presente sistema electrónico causados por deficiencias o
                  sobrecargas de líneas telefónicas o sobrecargas en el Centro
                  de Procesos de Datos, en el sistema de Internet o en otros
                  sistemas electrónicos, que puedan ser causados por terceras
                  personas mediante intromisiones ilegítimas fuera del control
                  del Responsable
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
