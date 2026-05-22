import {
  BookOpen,
  GraduationCap,
  Users,
  Briefcase,
  MessageCircle,
  FolderOpen,
  Star,
  Search
} from "lucide-react";

const profesores = [
  {
    nombre: "Laura Méndez",
    materia: "Comunicación Digital",
    calificacion: "4.8",
    descripcion: "Explica claro, exige lecturas y usa ejemplos actuales."
  },
  {
    nombre: "Carlos Andrade",
    materia: "Investigación",
    calificacion: "4.5",
    descripcion: "Buen acompañamiento y evaluaciones por proceso."
  }
];

const cursos = [
  {
    nombre: "Narrativas Digitales",
    dificultad: "Media",
    consejo: "Llevar avances semanales y guardar referentes."
  },
  {
    nombre: "Producción Multimedia",
    dificultad: "Alta",
    consejo: "Organizar roles desde el inicio del proyecto."
  }
];

const recursos = [
  {
    titulo: "Guía APA 7",
    tipo: "Guía",
    materia: "Investigación"
  },
  {
    titulo: "Banco de referencias académicas",
    tipo: "Enlace",
    materia: "Comunicación"
  }
];

const historias = [
  {
    titulo: "Lo que hubiera querido saber en primer semestre",
    categoria: "Consejo",
    texto: "Organiza tus entregas desde el primer día y pregunta sin pena."
  },
  {
    titulo: "Cómo sobrevivir a trabajos en grupo",
    categoria: "Experiencia",
    texto: "Define responsables, fechas y evidencia de cada avance."
  }
];

const oportunidades = [
  {
    titulo: "Pasantía en agencia digital",
    tipo: "Pasantía",
    fecha: "30 de junio"
  },
  {
    titulo: "Intercambio académico 2026",
    tipo: "Intercambio",
    fecha: "15 de julio"
  }
];

function Card({ icon, title, children }) {
  return (
    <div className="card">
      <div className="cardHeader">
        <div className="iconBox">{icon}</div>
        <h3>{title}</h3>
      </div>

      <div>{children}</div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="brand">conectU</div>

        <div className="menu">
          <a href="#profesores">Profesores</a>
          <a href="#cursos">Cursos</a>
          <a href="#repositorio">Repositorio</a>
          <a href="#historias">Historias</a>
          <a href="#oportunidades">Oportunidades</a>
        </div>
      </nav>

      <section className="hero">
        <div className="heroText">
          <span className="tag">Comunidad universitaria</span>

          <h1>
            Todo lo que un estudiante necesita saber, contado por otros
            estudiantes.
          </h1>

          <p>
            conectU reúne recomendaciones de profesores, cursos, recursos
            académicos, historias estudiantiles, pasantías, intercambios, grupos
            de estudio y tutorías.
          </p>

          <div className="buttons">
            <button>Explorar comunidad</button>
            <button className="secondary">Ver prototipo</button>
          </div>
        </div>

        <div className="heroPanel">
          <div className="searchBox">
            <Search size={18} />
            <span>Buscar profesor, curso o recurso...</span>
          </div>

          <div className="miniStats">
            <div>
              <strong>120+</strong>
              <span>Recomendaciones</span>
            </div>

            <div>
              <strong>45</strong>
              <span>Cursos</span>
            </div>

            <div>
              <strong>30</strong>
              <span>Recursos</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid">
        <Card icon={<GraduationCap />} title="Recomendaciones de profesores">
          {profesores.map((item) => (
            <div className="item" key={item.nombre}>
              <strong>{item.nombre}</strong>
              <p>{item.materia}</p>
              <span>
                ⭐ {item.calificacion} · {item.descripcion}
              </span>
            </div>
          ))}
        </Card>

        <Card icon={<BookOpen />} title="Guía de cursos">
          {cursos.map((item) => (
            <div className="item" key={item.nombre}>
              <strong>{item.nombre}</strong>
              <p>Dificultad: {item.dificultad}</p>
              <span>{item.consejo}</span>
            </div>
          ))}
        </Card>

        <Card icon={<FolderOpen />} title="Repositorio académico">
          {recursos.map((item) => (
            <div className="item" key={item.titulo}>
              <strong>{item.titulo}</strong>
              <p>
                {item.tipo} · {item.materia}
              </p>
            </div>
          ))}
        </Card>

        <Card icon={<MessageCircle />} title="Historias universitarias">
          {historias.map((item) => (
            <div className="item" key={item.titulo}>
              <strong>{item.titulo}</strong>
              <p>{item.categoria}</p>
              <span>{item.texto}</span>
            </div>
          ))}
        </Card>

        <Card icon={<Briefcase />} title="Pasantías e intercambios">
          {oportunidades.map((item) => (
            <div className="item" key={item.titulo}>
              <strong>{item.titulo}</strong>
              <p>
                {item.tipo} · Fecha límite: {item.fecha}
              </p>
            </div>
          ))}
        </Card>

        <Card icon={<Users />} title="Grupos y tutorías">
          <div className="item">
            <strong>Grupo de estudio: Investigación</strong>
            <p>8 integrantes · Sesión jueves 4:00 p.m.</p>
          </div>

          <div className="item">
            <strong>Tutoría: Escritura académica</strong>
            <p>Modalidad virtual · Cupos disponibles</p>
          </div>
        </Card>
      </section>

      <footer>
        <Star size={18} />
        conectU · Comunidad digital para estudiantes universitarios
      </footer>
    </div>
  );
}

export default App;