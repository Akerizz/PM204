from flask import Flask, render_template_string, request, session, redirect, url_for, flash

app = Flask(__name__)
# Clave secreta necesaria para manejar las sesiones
app.secret_key = 'aventura_secreta_movil_123'

# Estructura de datos con el contenido de la aventura
SECTIONS = [
    {
        'id': 'camara_reglas',
        'title': 'Las Reglas',
        'content': 'Normas de supervivencia: 80% de asistencia/trabajos para evaluación. Tolerancia de 10 min (sólo a las 7am y 2pm). Justificantes válidos sólo en las primeras 24h. Cero tareas extemporáneas. El plagio o deshonestidad te hará reprobar. Cero tolerancia a la indisciplina (3 llamadas = sin examen). Prohibido comer y usar audífonos.',
        'q1': '¿Qué porcentaje de asistencia se requiere para tener derecho a evaluación?',
        'opt1': ['70%', '80%', '90%'],
        'ans1': '80%',
        'q2': '¿Cuál es el tiempo de tolerancia permitido y en qué horario?',
        'opt2': ['15 min siempre', '10 min a las 7:00am y 14:00pm', 'No hay tolerancia'],
        'ans2': '10 min a las 7:00am y 14:00pm'
    },
    {
        'id': 'oraculo_notas',
        'title': 'Notas',
        'content': 'Se evalúa así: Para el 1P y 2P es 40% Conocimiento, 20% Desempeño, 30% Producto, 10% Integrador. Para el 3P las cosas cambian a: 10% Conocimiento, 10% Desempeño, 30% Producto y 50% Proyecto Integrador.',
        'q1': '¿Cuánto vale la Evidencia de Conocimiento en los Parciales 1 y 2?',
        'opt1': ['20%', '30%', '40%'],
        'ans1': '40%',
        'q2': '¿Cuál es el valor del Proyecto Integrador en el 3er Parcial?',
        'opt2': ['10%', '30%', '50%'],
        'ans2': '50%'
    },
    {
        'id': 'skills',
        'title': 'Habilidades',
        'content': 'Objetivo General: Desarrollar aplicaciones móviles interactivas y funcionales. Objetivo Particular: Comprender el ciclo de vida de la aplicación y dominar el diseño de interfaces.',
        'q1': '¿Cuál es el objetivo general de la materia?',
        'opt1': ['Hacer páginas web', 'Desarrollar aplicaciones móviles', 'Ensamblar computadoras'],
        'ans1': 'Desarrollar aplicaciones móviles',
        'q2': '¿Qué debes comprender según el objetivo particular?',
        'opt2': ['El ciclo de vida de la aplicación', 'Lenguaje ensamblador', 'Redes neuronales'],
        'ans2': 'El ciclo de vida de la aplicación'
    },
    {
        'id': 'linea_tiempo',
        'title': 'La Línea del Tiempo',
        'content': 'Fechas marcadas: 1er Parcial el 01-06-26. 2do Parcial el 06-07-26. 3er Parcial el 10-08-26. Examen Final el 17-08-26. Recuerda que la asistencia es obligatoria el día de entrega de calificaciones.',
        'q1': '¿Cuándo se lleva a cabo el 2do Parcial?',
        'opt1': ['01-06-26', '06-07-26', '10-08-26'],
        'ans1': '06-07-26',
        'q2': '¿En qué fecha se realiza el Examen Final?',
        'opt2': ['10-08-26', '17-08-26', '01-06-26'],
        'ans2': '17-08-26'
    }
]

# Plantilla HTML con diseño sencillo pero bonito usando Bootstrap 5
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aventura: Programación Móvil</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background-color: #2d1b36; color: #ecf0f1; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .container { max-width: 800px; margin-top: 40px; margin-bottom: 40px; }
        .card { background-color: #4a2c59; border: none; border-radius: 10px; margin-bottom: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.3); color: #ecf0f1; }
        .card-header { background-color: #9b59b6; color: white; font-weight: bold; font-size: 1.2rem; border-radius: 10px 10px 0 0 !important; }
        .locked { opacity: 0.5; pointer-events: none; filter: grayscale(100%); }
        .locked .card-header { background-color: #7f8c8d; }
        .btn-custom { background-color: #8e44ad; color: white; border: none; }
        .btn-custom:hover { background-color: #732d91; color: white; }
        .form-check-label { cursor: pointer; }
        .completed-badge { float: right; background-color: #673ab7; padding: 5px 10px; border-radius: 5px; font-size: 0.9rem; }
    </style>
</head>
<body>
    <div class="container">
        <div class="text-center mb-5">
            <h1 class="display-5 fw-bold">Guia de Supervivencia</h1>
            <h2>Materia: Programación Móvil</h2>
            <h5 class="text-info">Docente: Isc Ivan Isay Guerra López</h5>
            <p class="lead mt-3">¡Bienvenido, estudiante! Estás perdido,  pues vas a seguir perdido pero esta app te guiará para sobrevivir al semestre. Esperemos .</p>
        </div>

        {% with messages = get_flashed_messages(with_categories=true) %}
          {% if messages %}
            {% for category, message in messages %}
              <div class="alert alert-{{ category }} alert-dismissible fade show" role="alert">
                {{ message }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            {% endfor %}
          {% endif %}
        {% endwith %}

        {% for i in range(sections|length) %}
            {% set sec = sections[i] %}
            {% set is_locked = i > progress %}
            {% set is_completed = i < progress %}
            {% set is_current = i == progress %}

            <div class="card {{ 'locked' if is_locked else '' }}">
                <div class="card-header">
                    Nivel {{ i + 1 }}: {{ sec.title }}
                    {% if is_completed %}
                        <span class="completed-badge">Completado</span>
                    {% elif is_locked %}
                        <span class="completed-badge" style="background-color:#95a5a6;"> Bloqueado</span>
                    {% else %}
                        <span class="completed-badge" style="background-color:#e74c3c;">En progreso</span>
                    {% endif %}
                </div>
                <div class="card-body">
                    <p class="card-text fs-5 mb-4">{{ sec.content }}</p>
                    
                    {% if is_current %}
                        <form action="{{ url_for('submit_level', level_idx=i) }}" method="POST">
                            <div class="mb-3">
                                <label class="form-label fw-bold">1. {{ sec.q1 }}</label>
                                {% for opt in sec.opt1 %}
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="ans1" id="q1_{{ loop.index }}" value="{{ opt }}" required>
                                    <label class="form-check-label" for="q1_{{ loop.index }}">{{ opt }}</label>
                                </div>
                                {% endfor %}
                            </div>
                            
                            <div class="mb-4">
                                <label class="form-label fw-bold">2. {{ sec.q2 }}</label>
                                {% for opt in sec.opt2 %}
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="ans2" id="q2_{{ loop.index }}" value="{{ opt }}" required>
                                    <label class="form-check-label" for="q2_{{ loop.index }}">{{ opt }}</label>
                                </div>
                                {% endfor %}
                            </div>

                            <hr style="border-color: #7f8c8d;">
                            
                            <div class="form-check mb-4 mt-3">
                                <input class="form-check-input" type="checkbox" name="compromiso" id="compromiso_{{ i }}" required>
                                <label class="form-check-label text-warning fw-bold" for="compromiso_{{ i }}">
                                    Check de Compromiso: He leído la información y me comprometo a cumplir con lo establecido en esta sección.
                                </label>
                            </div>

                            <button type="submit" class="btn btn-custom w-100 fw-bold">Desbloquear Siguiente Nivel</button>
                        </form>
                    {% elif is_completed %}
                        <div class="alert alert-success m-0">¡Has superado este nivel con éxito y aceptado el compromiso!</div>
                    {% else %}
                        <div class="alert alert-secondary m-0 text-dark">Debes completar los niveles anteriores para acceder a esta información.</div>
                    {% endif %}
                </div>
            </div>
        {% endfor %}

        {% if progress == sections|length %}
            <div class="card border-success text-center p-5 mb-5" style="background-color: #673ab7;">
                <h2 class="text-white">¡Felicidades!</h2>
                <p class="text-white lead">Has completado la Aventura de Texto. Ahora estás listo para sobrevivir y triunfar en la materia de Programación Móvil.</p>
                <form action="{{ url_for('reset') }}" method="POST">
                    <button type="submit" class="btn btn-light fw-bold mt-3">Volver a iniciar</button>
                </form>
            </div>
        {% endif %}
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
"""

@app.route('/')
def index():
    # Inicializa el progreso en 0 (Nivel 1)
    if 'progress' not in session:
        session['progress'] = 0
    return render_template_string(HTML_TEMPLATE, sections=SECTIONS, progress=session['progress'])

@app.route('/submit/<int:level_idx>', methods=['POST'])
def submit_level(level_idx):
    # Verificación de seguridad para evitar saltos de nivel
    if 'progress' not in session or session['progress'] != level_idx:
        return redirect(url_for('index'))
    
    if level_idx < len(SECTIONS):
        sec = SECTIONS[level_idx]
        ans1 = request.form.get('ans1')
        ans2 = request.form.get('ans2')
        compromiso = request.form.get('compromiso')

        # Verifica si las respuestas son correctas y si el checkbox está marcado
        if ans1 == sec['ans1'] and ans2 == sec['ans2'] and compromiso:
            session['progress'] += 1
            flash('¡Respuesta correcta! Has desbloqueado el siguiente nivel.', 'success')
        else:
            if not compromiso:
                flash('Debes marcar el Check de Compromiso para continuar.', 'warning')
            else:
                flash('Algunas respuestas son incorrectas. Vuelve a intentarlo.', 'danger')
                
    return redirect(url_for('index'))

@app.route('/reset', methods=['POST'])
def reset():
    # Reinicia la aventura
    session['progress'] = 0
    return redirect(url_for('index'))

if __name__ == '__main__':
    # Ejecuta la aplicación
    app.run(debug=True, port=5000)
