import { useMemo, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Users,
  Briefcase,
  MessageCircle,
  FolderOpen,
  Star,
  Search,
  Heart,
  X,
  User,
  Plus,
  CheckCircle
} from "lucide-react";

const profesoresIniciales = [
  {
    id: 1,
    nombre: "Laura Méndez",
    materia: "Comunicación Digital",
    calificacion: "4.8",
    descripcion: "Explica claro, exige lecturas y usa ejemplos actuales."
  },
  {
    id: 2,
    nombre: "Carlos Andrade",
    materia: "Investigación",
    calificacion: "4.5",
    descripcion: "Buen acompañamiento y evaluaciones por proceso."
  }
];

const cursosIniciales = [
  {
    id: 1,
    nombre: "Narrativas Digitales",
    dificultad: "Media",
    consejo: "Llevar avances semanales y guardar referentes."
  },
  {
    id: 2,
    nombre: "Producción Multimedia",
    dificultad: "Alta",
    consejo: "Organizar roles desde el inicio del proyecto."
  }
];

const recursosIniciales = [
  {
    id: 1,
    titulo: "Guía APA 7",
    tipo: "Guía",
    materia: "Investigación",
    descripcion: "Material rápido para citar y referenciar trabajos académicos."
  },
  {
    id: 2,
    titulo: "Banco de referencias académicas",
    tipo: "Enlace",
    materia: "Comunicación",
    descripcion: "Recursos útiles para ensayos, investigaciones y proyectos."
  }
];

const historiasIniciales = [
  {
    id: 1,
    titulo: "Lo que hubiera querido saber en primer semestre",
    categoria: "Consejo",
    texto: "Organiza tus entregas desde el primer día y pregunta sin pena."
  },
  {
    id: 2,
    titulo: "Cómo sobrevivir a trabajos en grupo",
    categoria: "Experiencia",
    texto: "Define responsables, fechas y evidencia de cada avance."
  }
];

const oportunidadesIniciales = [
  {
    id: 1,
    titulo: "Pasantía en agencia digital",
    tipo: "Pasantía",
    fecha: "30 de junio",
    descripcion: "Oportunidad para estudiantes interesados en social media y diseño."
  },
  {
    id: 2,
    titulo: "Intercambio académico 2026",
    tipo: "Intercambio",
    fecha: "15 de julio",
    descripcion: "Convocatoria de movilidad académica para estudiantes universitarios."
  }
];

const gruposIniciales = [
  {
    id: 1,
    titulo: "Grupo de estudio: Investigación",
    descripcion: "8 integrantes · Sesión jueves 4:00 p.m."
  },
  {
    id: 2,
    titulo: "Tutoría: Escritura académica",
    descripcion: "Modalidad virtual · Cupos disponibles"
  }
];

function Card({ icon, title, id, children, action }) {
  return (
    <div className="card" id={id}>
      <div className="cardHeader">
        <div className="iconBox">{icon}</div>
        <h3>{title}</h3>
      </div>

      <div>{children}</div>

      {action && <div className="sectionActions">{action}</div>}
    </div>
  );
}

function App() {
  const [profesores] = useState(profesoresIniciales);
  const [cursos] = useState(cursosIniciales);
  const [recursos, setRecursos] = useState(() => {
    const saved = localStorage.getItem("conectu_recursos");
    return saved ? JSON.parse(saved) : recursosIniciales;
  });
  const [historias, setHistorias] = useState(() => {
    const saved = localStorage.getItem("conectu_historias");
    return saved ? JSON.parse(saved) : historiasIniciales;
  });
  const [oportunidades] = useState(oportunidadesIniciales);
  const [grupos] = useState(gruposIniciales);

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [usuario, setUsuario] = useState(() => {
    const saved = localStorage.getItem("conectu_usuario");
    return saved ? JSON.parse(saved) : null;
  });
  const [favoritos, setFavoritos] = useState(() => {
    const saved = localStorage.getItem("conectu_favoritos");
    return saved ? JSON.parse(saved) : [];
  });
  const [unidos, setUnidos] = useState(() => {
    const saved = localStorage.getItem("conectu_unidos");
    return saved ? JSON.parse(saved) : [];
  });

  const [loginData, setLoginData] = useState({
    correo: "estudiante@conectu.com",
    password: "123456"
  });

  const [nuevoRecurso, setNuevoRecurso] = useState({
    titulo: "",
    tipo: "Guía",
    materia: "",
    descripcion: ""
  });

  const [nuevaHistoria, setNuevaHistoria] = useState({
    titulo: "",
    categoria: "Consejo",
    texto: ""
  });

  function mostrarMensaje(texto) {
    setToast(texto);
    setTimeout(() => setToast(""), 2500);
  }

  function iniciarSesion(e) {
    e.preventDefault();

    if (!loginData.correo || !loginData.password) {
      mostrarMensaje("Completa los datos de acceso.");
      return;
    }

    const user = {
      nombre: "Santiago Rua",
      correo: loginData.correo,
      programa: "Comunicación Social y Periodismo"
    };

    setUsuario(user);
    localStorage.setItem("conectu_usuario", JSON.stringify(user));
    setModal(null);
    mostrarMensaje("Sesión iniciada correctamente.");
  }

  function cerrarSesion() {
    setUsuario(null);
    localStorage.removeItem("conectu_usuario");
    mostrarMensaje("Sesión cerrada.");
  }

  function guardarFavorito(tipo, item) {
    const id = `${tipo}-${item.id}`;
    const existe = favoritos.some((fav) => fav.id === id);

    if (existe) {
      const actualizados = favoritos.filter((fav) => fav.id !== id);
      setFavoritos(actualizados);
      localStorage.setItem("conectu_favoritos", JSON.stringify(actualizados));
      mostrarMensaje("Elemento eliminado de favoritos.");
      return;
    }

    const nuevo = {
      id,
      tipo,
      titulo: item.nombre || item.titulo,
      descripcion: item.materia || item.tipo || item.categoria || ""
    };

    const actualizados = [...favoritos, nuevo];
    setFavoritos(actualizados);
    localStorage.setItem("conectu_favoritos", JSON.stringify(actualizados));
    mostrarMensaje("Guardado en favoritos.");
  }

  function agregarRecurso(e) {
    e.preventDefault();

    if (!nuevoRecurso.titulo || !nuevoRecurso.materia || !nuevoRecurso.descripcion) {
      mostrarMensaje("Completa todos los campos del recurso.");
      return;
    }

    const recurso = {
      id: Date.now(),
      ...nuevoRecurso
    };

    const actualizados = [recurso, ...recursos];
    setRecursos(actualizados);
    localStorage.setItem("conectu_recursos", JSON.stringify(actualizados));

    setNuevoRecurso({
      titulo: "",
      tipo: "Guía",
      materia: "",
      descripcion: ""
    });

    setModal(null);
    mostrarMensaje("Recurso publicado correctamente.");
  }

  function agregarHistoria(e) {
    e.preventDefault();

    if (!nuevaHistoria.titulo || !nuevaHistoria.texto) {
      mostrarMensaje("Completa el título y la historia.");
      return;
    }

    const historia = {
      id: Date.now(),
      ...nuevaHistoria
    };

    const actualizadas = [historia, ...historias];
    setHistorias(actualizadas);
    localStorage.setItem("conectu_historias", JSON.stringify(actualizadas));

    setNuevaHistoria({
      titulo: "",
      categoria: "Consejo",
      texto: ""
    });

    setModal(null);
    mostrarMensaje("Historia publicada correctamente.");
  }

  function unirse(id, texto) {
    if (unidos.includes(id)) {
      mostrarMensaje("Ya realizaste esta acción.");
      return;
    }

    const actualizados = [...unidos, id];
    setUnidos(actualizados);
    localStorage.setItem("conectu_unidos", JSON.stringify(actualizados));
    mostrarMensaje(texto);
  }

  function coincide(item) {
    if (!search.trim()) return true;
    return JSON.stringify(item).toLowerCase().includes(search.toLowerCase());
  }

  const totalResultados = useMemo(() => {
    const datos = [
      ...profesores,
      ...cursos,
      ...recursos,
      ...historias,
      ...oportunidades,
      ...grupos
    ];

    if (!search.trim()) return datos.length;
    return datos.filter(coincide).length;
  }, [search, profesores, cursos, recursos, historias, oportunidades, grupos]);

  return (
    <div className="app">
      {toast && <div className="toast">{toast}</div>}

      <nav className="navbar">
        <div className="brand">conectU</div>

        <div className="menu">
          <a href="#profesores">Profesores</a>
          <a href="#cursos">Cursos</a>
          <a href="#repositorio">Repositorio</a>
          <a href="#historias">Historias</a>
          <a href="#oportunidades">Oportunidades</a>
        </div>

        <div className="userNav">
          {usuario ? (
            <>
              <span>{usuario.nombre}</span>
              <button onClick={cerrarSesion}>Salir</button>
            </>
          ) : (
            <button onClick={() => setModal("login")}>Ingresar</button>
          )}
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
            <button onClick={() => document.getElementById("profesores").scrollIntoView()}>
              Explorar comunidad
            </button>
            <button className="secondary" onClick={() => setModal("login")}>
              Ingresar a conectU
            </button>
          </div>
        </div>

        <div className="heroPanel">
          <div className="searchBox">
            <Search size={18} />
            <input
              placeholder="Buscar profesor, curso o recurso..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="resultLine">
            {search ? (
              <span>{totalResultados} resultados encontrados para “{search}”</span>
            ) : (
              <span>Busca profesores, cursos, historias, recursos u oportunidades.</span>
            )}
          </div>

          <div className="miniStats">
            <div>
              <strong>{profesores.length + historias.length}+</strong>
              <span>Recomendaciones</span>
            </div>

            <div>
              <strong>{cursos.length}</strong>
              <span>Cursos</span>
            </div>

            <div>
              <strong>{recursos.length}</strong>
              <span>Recursos</span>
            </div>
          </div>
        </div>
      </section>

      <section className="grid">
        <Card icon={<GraduationCap />} title="Recomendaciones de profesores" id="profesores">
          {profesores.filter(coincide).map((item) => (
            <div className="item" key={item.id}>
              <strong>{item.nombre}</strong>
              <p>{item.materia}</p>
              <span>
                ⭐ {item.calificacion} · {item.descripcion}
              </span>
              <button className="miniButton" onClick={() => guardarFavorito("Profesor", item)}>
                <Heart size={15} />
                Guardar
              </button>
            </div>
          ))}
        </Card>

        <Card icon={<BookOpen />} title="Guía de cursos" id="cursos">
          {cursos.filter(coincide).map((item) => (
            <div className="item" key={item.id}>
              <strong>{item.nombre}</strong>
              <p>Dificultad: {item.dificultad}</p>
              <span>{item.consejo}</span>
              <button className="miniButton" onClick={() => guardarFavorito("Curso", item)}>
                <Heart size={15} />
                Guardar
              </button>
            </div>
          ))}
        </Card>

        <Card
          icon={<FolderOpen />}
          title="Repositorio académico"
          id="repositorio"
          action={
            <button className="outlineButton" onClick={() => setModal("recurso")}>
              <Plus size={16} />
              Subir recurso
            </button>
          }
        >
          {recursos.filter(coincide).map((item) => (
            <div className="item" key={item.id}>
              <strong>{item.titulo}</strong>
              <p>
                {item.tipo} · {item.materia}
              </p>
              <span>{item.descripcion}</span>
              <button className="miniButton" onClick={() => guardarFavorito("Recurso", item)}>
                <Heart size={15} />
                Guardar
              </button>
            </div>
          ))}
        </Card>

        <Card
          icon={<MessageCircle />}
          title="Historias universitarias"
          id="historias"
          action={
            <button className="outlineButton" onClick={() => setModal("historia")}>
              <Plus size={16} />
              Publicar historia
            </button>
          }
        >
          {historias.filter(coincide).map((item) => (
            <div className="item" key={item.id}>
              <strong>{item.titulo}</strong>
              <p>{item.categoria}</p>
              <span>{item.texto}</span>
              <button className="miniButton" onClick={() => guardarFavorito("Historia", item)}>
                <Heart size={15} />
                Guardar
              </button>
            </div>
          ))}
        </Card>

        <Card icon={<Briefcase />} title="Pasantías e intercambios" id="oportunidades">
          {oportunidades.filter(coincide).map((item) => (
            <div className="item" key={item.id}>
              <strong>{item.titulo}</strong>
              <p>
                {item.tipo} · Fecha límite: {item.fecha}
              </p>
              <span>{item.descripcion}</span>
              <button className="miniButton" onClick={() => guardarFavorito("Oportunidad", item)}>
                <Heart size={15} />
                Guardar
              </button>
            </div>
          ))}
        </Card>

        <Card icon={<Users />} title="Grupos y tutorías">
          {grupos.filter(coincide).map((item) => (
            <div className="item" key={item.id}>
              <strong>{item.titulo}</strong>
              <p>{item.descripcion}</p>
              <button
                className="miniButton"
                onClick={() =>
                  unirse(`grupo-${item.id}`, item.titulo.includes("Tutoría") ? "Tutoría reservada." : "Te uniste al grupo.")
                }
              >
                <CheckCircle size={15} />
                {unidos.includes(`grupo-${item.id}`) ? "Listo" : "Unirme"}
              </button>
            </div>
          ))}
        </Card>
      </section>

      {favoritos.length > 0 && (
        <section className="favorites">
          <h2>Mis guardados</h2>
          <p>Elementos que el estudiante ha marcado como importantes.</p>

          <div className="favoriteList">
            {favoritos.map((fav) => (
              <div key={fav.id}>
                <strong>{fav.titulo}</strong>
                <span>{fav.tipo} · {fav.descripcion}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer>
        <Star size={18} />
        conectU · Comunidad digital para estudiantes universitarios
      </footer>

      {modal === "login" && (
        <Modal title="Ingresar a conectU" onClose={() => setModal(null)}>
          <form onSubmit={iniciarSesion} className="modalForm">
            <label>Correo</label>
            <input
              type="email"
              value={loginData.correo}
              onChange={(e) => setLoginData({ ...loginData, correo: e.target.value })}
            />

            <label>Contraseña</label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />

            <button type="submit">
              <User size={16} />
              Iniciar sesión
            </button>

            <div className="demoBox">
              <strong>Usuario para exposición</strong>
              <span>Correo: estudiante@conectu.com</span>
              <span>Contraseña: 123456</span>
            </div>
          </form>
        </Modal>
      )}

      {modal === "recurso" && (
        <Modal title="Subir recurso académico" onClose={() => setModal(null)}>
          <form onSubmit={agregarRecurso} className="modalForm">
            <label>Título</label>
            <input
              value={nuevoRecurso.titulo}
              onChange={(e) => setNuevoRecurso({ ...nuevoRecurso, titulo: e.target.value })}
            />

            <label>Tipo</label>
            <select
              value={nuevoRecurso.tipo}
              onChange={(e) => setNuevoRecurso({ ...nuevoRecurso, tipo: e.target.value })}
            >
              <option>Guía</option>
              <option>Resumen</option>
              <option>Enlace</option>
              <option>Video</option>
              <option>Apunte</option>
            </select>

            <label>Materia</label>
            <input
              value={nuevoRecurso.materia}
              onChange={(e) => setNuevoRecurso({ ...nuevoRecurso, materia: e.target.value })}
            />

            <label>Descripción</label>
            <textarea
              value={nuevoRecurso.descripcion}
              onChange={(e) => setNuevoRecurso({ ...nuevoRecurso, descripcion: e.target.value })}
            />

            <button type="submit">
              <Plus size={16} />
              Publicar recurso
            </button>
          </form>
        </Modal>
      )}

      {modal === "historia" && (
        <Modal title="Publicar historia universitaria" onClose={() => setModal(null)}>
          <form onSubmit={agregarHistoria} className="modalForm">
            <label>Título</label>
            <input
              value={nuevaHistoria.titulo}
              onChange={(e) => setNuevaHistoria({ ...nuevaHistoria, titulo: e.target.value })}
            />

            <label>Categoría</label>
            <select
              value={nuevaHistoria.categoria}
              onChange={(e) => setNuevaHistoria({ ...nuevaHistoria, categoria: e.target.value })}
            >
              <option>Consejo</option>
              <option>Experiencia</option>
              <option>Advertencia</option>
              <option>Oportunidad</option>
            </select>

            <label>Contenido</label>
            <textarea
              value={nuevaHistoria.texto}
              onChange={(e) => setNuevaHistoria({ ...nuevaHistoria, texto: e.target.value })}
            />

            <button type="submit">
              <Plus size={16} />
              Publicar historia
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="modalOverlay">
      <div className="modalCard">
        <div className="modalHeader">
          <h2>{title}</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default App;