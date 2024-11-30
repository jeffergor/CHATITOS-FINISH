class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        };

        this.state = false;
        this.messages = [];

        // Definir preguntas y respuestas predefinidas
        this.predefinedResponses = {
            "hola": "Hola",
            "Hola": "Hola",
            "¿cómo estás?": "Estoy bien, gracias por preguntar.",
            "¿qué hora es?": "La hora actual es " + new Date().toLocaleTimeString(),
            "¿qué día es hoy?": "Hoy es " + new Date().toLocaleDateString('es-ES', { weekday: 'long' }),
            "¿cuál es tu nombre?": "Me llamo Chatito.",
            "¿qué haces?": "Estoy aquí para ayudarte.",
            "¿cuál es la fecha de hoy?": "La fecha de hoy es " + new Date().toLocaleDateString(),
            "¿dónde estás?": "Estoy en la nube.",
            "¿cuáles son tus servicios?": "Servicios dinámicos",
            "¿cuál es tu color favorito?": "Me gustan todos los colores.",
            "Adiós": "Adiós, que tengas un buen día."
        };

        // Lista de servicios
        this.services = [
            "PQRS",
            "Dependencias",
            "Servicios públicos",
            "Trámites",
            "Proyectos",
            "Seguimiento a trámites y servicios",
            "Chatea con un asesor",
            "Reportes",
            "Capacitación"
        ];

        // Dependencias y direcciones
        this.dependencies = {
            "Secretaría General": "Calle 1 #2-3, Edificio A",
            "Secretaría de Educación": "Calle 4 #5-6, Edificio B",
            "Secretaría de Gobierno": "Carrera 7 #8-9, Edificio C",
            "Secretaría de Hacienda": "Avenida 10 #11-12, Edificio D",
            "Secretaría de Salud": "Calle 13 #14-15, Edificio E",
            "Tránsito y Transporte": "Calle 16 #17-18, Edificio F",
            "Secretaría de Obras Públicas": "Carrera 19 #20-21, Edificio G",
            "Secretaría de Agricultura, Ganadería y Medio Ambiente": "Calle 22 #23-24, Edificio H",
            "Secretaría de Gobierno y Desarrollo Comunitario": "Carrera 25 #26-27, Edificio I",
            "Departamento Administrativo de Planeación": "Calle 28 #29-30, Edificio J",
            "Secretaría de Tic y Gobierno Abierto": "Carrera 31 #32-33, Edificio K",
            "Secretaría de Ambiente y Desarrollo Sostenible": "Calle 34 #35-36, Edificio L",
            "Dirección de Cultura y Turismo": "Carrera 37 #38-39, Edificio M",
            "Secretaría de Planeación": "Calle 40 #41-42, Edificio N"
        };

        // Servicios públicos
        this.publicServices = {
            "Servicio de Agua": "https://www.ejemplo.com/servicio-agua",
            "Servicio de Electricidad": "https://www.ejemplo.com/servicio-electricidad",
            "Servicio de Gas": "https://www.ejemplo.com/servicio-gas",
            "Servicio de Internet": "https://www.ejemplo.com/servicio-internet",
            "Servicio de Recolección de Basura": "https://www.ejemplo.com/servicio-basura",
            "Servicio de Transporte Público": "https://www.ejemplo.com/servicio-transporte",
            "Servicio de Seguridad": "https://www.ejemplo.com/servicio-seguridad",
            "Servicio de Salud": "https://www.ejemplo.com/servicio-salud",
            "Servicio de Educación": "https://www.ejemplo.com/servicio-educacion"
        };

        // Servicios de trámites
        this.tramites = [
            "Ampliación del servicio educativo",
            "Cambio de sede de un establecimiento educativo",
            "Pago de obligaciones tributarias",
            "Inscripción de personas ante el Registro Único Nacional de Tránsito - RUNT-",
            "Licencia para prestación de servicios en seguridad y salud en el trabajo",
            "Certificado de libertad y tradición de un vehículo automotor",
            "Matrícula de vehículos automotores",
            "Licencia de conducción",
            "Renovación de la licencia de conducción",
            "Duplicado de la licencia de conducción",
            "Traspaso de propiedad de un vehículo automotor",
            "Inscripción Registro Único Tributario (RUT)",
            "Actualización Registro Único Tributario (RUT)",
            "Consulta Registro Único Tributario (RUT)",
            "Certificado de Residencia",
            "Certificado de Estratificación y nomenclatura",
            "Certificado de Manipulación de Alimentos",
            "Certificado de paz y salvo",
            "Impuestos Predial",
            "Impuestos Industria y Comercio",
            "Impuestos Delineación Urbana",
            "Impuestos Estado de Cuenta",
            "Impuestos Entidades Agregadas",
            "Planes de vivienda",
            "Subsidios de vivienda"
        ];
         // Proyectos y sus enlaces
         this.proyectos = {
            "SECRETARÍA DE INFRAESTRUCTURA PÚBLICA": "https://www.ejemplo.com/infraestructura-publica",
            "SECRETARÍA DE INTEGRACIÓN SOCIAL": "https://www.ejemplo.com/integracion-social",
            "SECRETARÍA AMBIENTE Y DESARROLLO SOSTENIBLE": "https://www.ejemplo.com/ambiente-desarrollo",
            "SECRETARÍA DE AGRICULTURA": "https://www.ejemplo.com/agricultura",
            "SECRETARÍA DE TIC Y GOBIERNO ABIERTO": "https://www.ejemplo.com/tic-gobierno-abierto",
            "SECRETARÍA DE MINAS Y ENERGÍA": "https://www.ejemplo.com/minas-energia",
            "SECRETARÍA DE SALUD": "https://www.ejemplo.com/salud",
            "INSTITUTO DE RECREACIÓN Y DEPORTES DE BOYACÁ - INDEPORTES BOYACÁ": "https://www.ejemplo.com/ind-deportes-boyaca",
            "SECRETARÍA DE CULTURA Y PATRIMONIO": "https://www.ejemplo.com/cultura-patrimonio"
        };

        // Códigos de seguimiento y su estado
        this.trackingCodes = {
            "12345": "En proceso",
            "67890": "En proceso",
            "54321": "Respuesta enviada",
            "09876": "Respuesta enviada"
        };
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));

        sendButton.addEventListener('click', () => this.onSendButton(chatBox));

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatbox);
            }
        });
    }

    toggleState(chatbox) {
        this.state = !this.state;

        if (this.state) {
            chatbox.classList.add('chatbox--active');
        } else {
            chatbox.classList.remove('chatbox--active');
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value.trim();
        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);
        this.updateChatText(chatbox);

        if (text1.toLowerCase() === "¿cuáles son tus servicios?") {
            this.showServices(chatbox);
            textField.value = '';
            return;
        }

        let response = this.predefinedResponses[text1.toLowerCase()];
        if (response) {
            let msg2 = { name: "Sam", message: response };
            this.messages.push(msg2);
            this.updateChatText(chatbox);
            textField.value = '';
        } else if (text1.toLowerCase() === "seguimiento a trámites y servicios") {
            this.askForTrackingCode(chatbox);
            textField.value = '';
        } else {
            let msg2 = { name: "Sam", message: "Lo siento, no tengo una respuesta para eso." };
            this.messages.push(msg2);
            this.updateChatText(chatbox);
            textField.value = '';
        }
    }

    askForTrackingCode(chatbox) {
        let trackingHTML = `
            <label for="trackingCode">Por favor, ingresa el código de seguimiento (5 dígitos):</label>
            <input type="text" id="trackingCode" oninput="chatbox.validateTrackingCode()">
        `;

        let msg3 = { name: "Sam", message: trackingHTML };
        this.messages.push(msg3);
        this.updateChatText(chatbox);
    }

    validateTrackingCode() {
        const code = document.getElementById('trackingCode').value;
        if (code.length === 5) {
            let status = this.trackingCodes[code];
            let msg4 = { name: "Sam", message: status ? `El estado del código de seguimiento es: ${status}` : "Código no encontrado. Por favor, verifica el código e intenta de nuevo." };
            this.messages.push(msg4);
            this.updateChatText(document.querySelector('.chatbox__support'));
        }
    }
    

    showServices(chatbox) {
        let serviceListHTML = '<div class="services__list">';
        this.services.forEach((service) => {
            serviceListHTML += `<button class="service__item" onclick="chatbox.handleServiceSelection('${service}')">${service}</button>`;
        });
        serviceListHTML += '</div>';

        let msg2 = { name: "Sam", message: serviceListHTML };
        this.messages.push(msg2);
        this.updateChatText(chatbox);
    }

    handleServiceSelection(service) {
        let msg2 = { name: "Sam", message: `Seleccionaste: ${service}. Por favor elige una opción.` };
        this.messages.push(msg2);
    
        if (service === "PQRS") {
            this.showPqrsForm();
        } else if (service === "Dependencias") {
            this.showDependencies();
        } else if (service === "Servicios públicos") {
            this.showPublicServices();
        } else if (service === "Trámites") {
            this.showTramites();
        } else if (service === "Proyectos") {
            this.showProyectos();
        } else if (service === "Seguimiento a trámites y servicios") {
            this.askForTrackingCode(document.querySelector('.chatbox__support'));
        } else if (service === "Reportes") {
            this.showReportButton();
        }
        this.updateChatText(document.querySelector('.chatbox__support'));
    }
    

    showTramites() {
        let tramitesHTML = `
            <label for="tramites">Selecciona un trámite:</label>
            <select id="tramites">
                <option value="" disabled selected>Elige un trámite</option>
        `;
        this.tramites.forEach((tramit) => {
            tramitesHTML += `<option>${tramit}</option>`;
        });
        tramitesHTML += `</select>`;

        let msg3 = { name: "Sam", message: tramitesHTML };
        this.messages.push(msg3);
    }

    showProyectos() {
        let proyectosHTML = `
            <label for="proyectos">Selecciona un proyecto:</label>
            <select id="proyectos" onchange="chatbox.openProyectoLink(this.value)">
                <option value="" disabled selected>Elige un proyecto</option>
        `;
        for (const [proyecto, link] of Object.entries(this.proyectos)) {
            proyectosHTML += `<option value="${link}">${proyecto}</option>`;
        }
        proyectosHTML += `</select>`;

        let msg3 = { name: "Sam", message: proyectosHTML };
        this.messages.push(msg3);
    }

    openProyectoLink(link) {
        if (link) {
            window.open(link, '_blank'); // Abre el enlace en una nueva pestaña
        }
    }

    showPqrsForm() {
        let formHTML = `
            <form class="pqrs-form" onsubmit="chatbox.submitForm(event)">
                <label for="name">Nombre Completo:</label>
                <input type="text" id="name" name="name" required>
                
                <label for="email">  Correo Electrónico:</label>
                <input type="email" id="email" name="email" required>
                
                <label for="phone">Teléfono:</label>
                <input type="text" id="phone" name="phone" required>
                
                <label for="type">Tipo de Solicitud:</label>
                <select id="type" name="type" required>
                    <option value="peticion">Petición</option>
                    <option value="queja">Queja</option>
                    <option value="reclamo">Reclamo</option>
                    <option value="sugerencia">Sugerencia</option>
                    <option value="felicitacion">Felicitación</option>
                    <option value="denuncia">Denuncia</option>
                    <option value="solicitud-informacion">Solicitud de Información</option>
                    <option value="agendar-cita">Agendar Cita</option>
                    <option value="seguimiento-tramite">Seguimiento a Trámite o Servicio</option>
                </select>
                
                <label for="file">Adjuntar Documento:</label>
                <input type="file" id="file" name="file" required>
                
                <button type="submit">Enviar</button>
            </form>
        `;
        let msg3 = { name: "Sam", message: formHTML };
        this.messages.push(msg3);
    }
    showReportButton() {
        let reportButtonHTML = `
            <div class="report-button">
                <a href="https://www.tunja-boyaca.gov.co/peticiones-quejas-reclamos" target="_blank">
                    <button>Clickeame</button>
                </a>
            </div>
        `;
    
        let msg = { name: "Sam", message: reportButtonHTML };
        this.messages.push(msg);
        this.updateChatText(document.querySelector('.chatbox__support'));
    }
    

    showDependencies() {
        let dependenciesHTML = `
            <label for="dependencies">Selecciona una dependencia:</label>
            <select id="dependencies" onchange="chatbox.showDependencyLocation(this.value)">
                <option value="" disabled selected>Elige una opción</option>
        `;
        for (const [dependency, address] of Object.entries(this.dependencies)) {
            dependenciesHTML += `<option value="${address}">${dependency}</option>`;
        }
        dependenciesHTML += `</select>`;

        let msg3 = { name: "Sam", message: dependenciesHTML };
        this.messages.push(msg3);
    }

    showDependencyLocation(address) {
        if (address) {
            let msg4 = { name: "Sam", message: `La dirección de la dependencia seleccionada es: ${address}` };
            this.messages.push(msg4);
            this.updateChatText(document.querySelector('.chatbox__support'));
        }
    }

    showPublicServices() {
        let publicServicesHTML = `
            <label for="publicServices">Selecciona un servicio público:</label>
            <select id="publicServices" onchange="chatbox.openPublicServiceLink(this.value)">
                <option value="" disabled selected>Elige un servicio</option>
        `;
        for (const [service, link] of Object.entries(this.publicServices)) {
            publicServicesHTML += `<option value="${link}">${service}</option>`;
        }
        publicServicesHTML += `</select>`;

        let msg3 = { name: "Sam", message: publicServicesHTML };
        this.messages.push(msg3);
    }

    openPublicServiceLink(link) {
        if (link) {
            window.open(link, '_blank'); // Abre el enlace en una nueva pestaña
        }
    }

    submitForm(event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.log("Formulario enviado:", {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            type: formData.get("type"),
            file: formData.get("file")
        });

        let msg4 = { name: "Sam", message: "¡Formulario enviado exitosamente! Gracias por tu solicitud." };
        this.messages.push(msg4);
        this.updateChatText(document.querySelector('.chatbox__support'));
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function (item) {
            if (item.name === "Sam") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();
