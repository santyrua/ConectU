import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  Users,
  Briefcase,
  MessageCircle,
  FolderOpen,
  Star,
  Search,
  User,
  LogOut,
  Plus,
  Heart,
  CheckCircle,
  Calendar,
  Home,
  Send,
  Settings
} from "lucide-react";

const defaultProfile = {
  nombre: "Santiago Rodríguez",
  correo: "estudiante@conectu.com",
  programa: "Comunicación Social y Periodismo",
  semestre: "5",
  intereses: "Diseño, investigación, medios digitales"
};

const profesoresIniciales = [
  {
    id: 1,
    nombre: "Laura Méndez",
    materia: "Comunicación Digital",
    calificacion: "4.8",
    descripcion: "Explica claro, usa ejemplos actuales y acompaña bien los procesos."
  },
  {
    id: 2,
    nombre: "Carlos Andrade",
    materia: "Investigación",
    calificacion: "4.5",
    descripcion: "Exigente, pero organizado. Recomiendan llevar avances semanales."
  },
  {
    id: 3,
    nombre: "María Fernanda Ruiz",
    materia: "Narrativas Transmedia",
    calificacion: "4.7",
    descripcion: "Dinámica, creativa y con buena retroalimentación en proyectos."
  }
];

const cursosIniciales = [
  {
    id: 1,
    nombre: "Narrativas Digitales",
    dificultad: "Media",
    consejo: "Llevar avances semanales y guardar referentes desde el inicio."
  },
  {
    id: 2,
    nombre: "Producción Multimedia",
    dificultad: "Alta",
    consejo: "Organizar roles desde el primer día y cuidar la entrega final."
  },
  {
    id: 3,
    nombre: "Investigación Social",
    dificultad: "Media",
    consejo: "Tener claro el problema de investigación antes de escribir objetivos."
  }
];

const recursosIniciales = [
  {
    id: 1,
    titulo: "Guía rápida APA 7",
    tipo: "Guía",
    materia: "Investigación",
    descripcion: "Resumen para citar, referenciar y organizar trabajos académicos."
  },
  {
    id: 2,
    titulo: "Banco de referencias sobre comunicación",
    tipo: "Enlace",
    materia: "Comunicación",
    descripcion: "Repositorio con artículos útiles para ensayos y proyectos."
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
    descripcion: "Convocatoria para estudiantes interesados en social media y diseño."
  },
  {
    id: 2,
    titulo: "Intercambio académico 2026",
    tipo: "Intercambio",
    fecha: "15 de julio",
    descripcion: "Oportunidad de movilidad para estudiantes con buen promedio."
  }
];

const gruposIniciales = [
  {
    id: 1,
    nombre: "Grupo de estudio: Investigación",
    materia: "Investigación",
    integrantes: 8,
    horario: "Jueves 4:00 p.m."
  },
  {
    id: 2,
    nombre: "Grupo de estudio: Producción Multimedia",
    materia: "Multimedia",
    integrantes: 6,
    horario: "Martes 5:00 p.m."
  }
];

const tutoriasIniciales = [
  {
    id: 1,
    titulo: "Tutoría de escritura académica",
    materia: "Investigación",
    modalidad: "Virtual",
    horario: "Miércoles 6:00 p.m."
  },
  {
    id: 2,
    titulo: "Tutoría de edición multimedia",
    materia: "Producción Multimedia",
    modalidad: "Presencial",
    horario: "Viernes 3:00 p.m."
  }
];

function getStorage(key, fallback) {
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : fallback;
}

function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    return localStorage.getItem("conectu_logged") === "true";
  });

  const [activeSection, setActiveSection] = useState("inicio");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [loginData, setLoginData] = useState({
    correo: "estudiante@conectu.com",
    password: "123456"
  });

  const [profile, setProfile] = useState(() =>
    getStorage("conectu_profile", defaultProfile)
  );

  const [profesores, setProfesores] = useState(() =>
    getStorage("conectu_profesores", profesoresIniciales)
  );

  const [cursos] = useState(cursosIniciales);

  const [recursos, setRecursos] = useState(() =>
    getStorage("conectu_recursos", recursosIniciales)
  );

  const [historias, setHistorias] = useState(() =>
    getStorage("conectu_historias", historiasIniciales)
  );

  const [oportunidades] = useState(oportunidadesIniciales);
  const [grupos] = useState(gruposIniciales);
  const [tutorias] = useState(tutoriasIniciales);

  const [favoritos, setFavoritos] = useState(() =>
    getStorage("conectu_favoritos", [])
  );

  const [gruposUnidos, setGruposUnidos] = useState(() =>
    getStorage("conectu_grupos_unidos", [])
  );

  const [tutoriasReservadas, setTutoriasReservadas] = useState(() =>
    getStorage("conectu_tutorias_reservadas", [])
  );

  const [nuevoProfesor, setNuevoProfesor] = useState({
    nombre: "",
    materia: "",
    calificacion: "5.0",
    descripcion: ""
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

  useEffect(() => saveStorage("conectu_profile", profile), [profile]);
  useEffect(() => saveStorage("conectu_profesores", profesores), [profesores]);
  useEffect(() => saveStorage("conectu_recursos", recursos), [recursos]);
  useEffect(() => saveStorage("conectu_historias", historias), [historias]);
  useEffect(() => saveStorage("conectu_favoritos", favoritos), [favoritos]);
  useEffect(() => saveStorage("conectu_grupos_unidos", gruposUnidos), [gruposUnidos]);
  useEffect(() => saveStorage("conectu_tutorias_reservadas", tutoriasReservadas), [tutoriasReservadas]);

  function showToast(message) {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  }

  function handleLogin(e) {
    e.preventDefault();

    if (!loginData.correo || loginData.password.length < 3) {
      showToast("Ingresa un correo y una contraseña válida.");
      return;
    }

    localStorage.setItem("conectu_logged", "true");
    setLoggedIn(true);
    showToast("Bienvenido a conectU.");
  }

  function handleLogout() {
    localStorage.setItem("conectu_logged", "false");
    setLoggedIn(false);
    setActiveSection("inicio");
    showToast("Sesión cerrada.");
  }

  function toggleFavorito(tipo, item) {
    const id = `${tipo}-${item.id}`;
    const exists = favoritos.some((fav) => fav.id === id);

    if (exists) {
      setFavoritos(favoritos.filter((fav) => fav.id !== id));
      showToast("Elemento eliminado de favoritos.");
    } else {
      setFavoritos([
        ...favoritos,
        {
          id,
          tipo,
          titulo: item.nombre || item.titulo,
          descripcion: item.materia || item.tipo || item.categoria
        }
      ]);
      showToast("Elemento guardado en favoritos.");
    }
  }

  function agregarProfesor(e) {
    e.preventDefault();

    if (!nuevoProfesor.nombre || !nuevoProfesor.materia || !nuevoProfesor.descripcion) {
      showToast("Completa todos los campos de la recomendación.");
      return;
    }

    const profesor = {
      id: Date.now(),
      ...nuevoProfesor
    };

    setProfesores([profesor, ...profesores]);
    setNuevoProfesor({
      nombre: "",
      materia: "",
      calificacion: "5.0",
      descripcion: ""
    });
    showToast("Recomendación publicada.");
  }

  function agregarRecurso(e) {
    e.preventDefault();

    if (!nuevoRecurso.titulo || !nuevoRecurso.materia || !nuevoRecurso.descripcion) {
      showToast("Completa todos los campos del recurso.");
      return;
    }

    const recurso = {
      id: Date.now(),
      ...nuevoRecurso
    };

    setRecursos([recurso, ...recursos]);
    setNuevoRecurso({
      titulo: "",
      tipo: "Guía",
      materia: "",
      descripcion: ""
    });
    showToast("Recurso publicado.");
  }

  function agregarHistoria(e) {
    e.preventDefault();

    if (!nuevaHistoria.titulo || !nuevaHistoria.texto) {
      showToast("Completa el título y el contenido.");
      return;
    }

    const historia = {
      id: Date.now(),
      ...nuevaHistoria
    };

    setHistorias([historia, ...historias]);
    setNuevaHistoria({
      titulo: "",
      categoria: "Consejo",
      texto: ""
    });
    showToast("Historia publicada.");
  }

  function unirseGrupo(id) {
    if (gruposUnidos.includes(id)) {
      showToast("Ya haces parte de este grupo.");
      return;
    }

    setGruposUnidos([...gruposUnidos, id]);
    showToast("Te uniste al grupo de estudio.");
  }

  function reservarTutoria(id) {
    if (tutoriasReservadas.includes(id)) {
      showToast("Ya reservaste esta tutoría.");
      return;
    }

    setTutoriasReservadas([...tutoriasReservadas, id]);
    showToast("Tutoría reservada correctamente.");
  }

  function matches(item) {
    const text = JSON.stringify(item).toLowerCase();
    return text.includes(query.toLowerCase());
  }

  const menu = [
    { id: "inicio", label: "Inicio", icon: <Home size={18} /> },
    { id: "profesores", label: "Profesores", icon: <GraduationCap size={18} /> },
    { id: "cursos", label: "Cursos", icon: <BookOpen size={18} /> },
    { id: "repositorio", label: "Repositorio", icon: <FolderOpen size={18} /> },
    { id: "historias", label: "Historias", icon: <MessageCircle size={18} /> },
    { id: "oportunidades", label: "Oportunidades", icon: <Briefcase size={18} /> },
    { id: "grupos", label: "Grupos", icon: <Users size={18} /> },
    { id: "tutorias", label: "Tutorías", icon: <Calendar size={18} /> },
    { id: "perfil", label: "Perfil", icon: <Settings size={18} /> }
  ];

  const tituloSeccion = useMemo(() => {
    const item = menu.find((section) => section.id === activeSection);
    return item ? item.label : "Inicio";
  }, [activeSection]);

  if (!loggedIn) {
    return (
      <div className="landing">
        {toast && <div className="toast">{toast}</div>}

        <nav className="topbar">
          <div className="brand">conectU</div>
          <span className="topLabel">Comunidad universitaria</span>
        </nav>

        <main className="landingGrid">
          <section className="landingText">
            <span className="tag">Página web para estudiantes</span>
            <h1>Todo lo que un estudiante necesita saber, en un solo lugar.</h1>
            <p>
              conectU reúne recomendaciones de profesores, cursos, recursos
              académicos, historias universitarias, pasantías, intercambios,
              grupos de estudio y tutorías.
            </p>

            <div className="landingCards">
              <div>
                <strong>Profesores</strong>
                <span>Recomendaciones académicas</span>
              </div>
              <div>
                <strong>Cursos</strong>
                <span>Guías y consejos</span>
              </div>
              <div>
                <strong>Comunidad</strong>
                <span>Historias y apoyo estudiantil</span>
              </div>
            </div>
          </section>

          <section className="loginCard">
            <div className="loginHeader">
              <User size={30} />
              <div>
                <h2>Ingresar a conectU</h2>
                <p>Accede como estudiante para explorar la plataforma.</p>
              </div>
            </div>

            <form onSubmit={handleLogin}>
              <label>Correo</label>
              <input
                type="email"
                value={loginData.correo}
                onChange={(e) =>
                  setLoginData({ ...loginData, correo: e.target.value })
                }
              />

              <label>Contraseña</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />

              <button type="submit" className="fullButton">
                Ingresar
              </button>
            </form>

            <div className="demoAccess">
              <strong>Usuario para exposición</strong>
              <span>Correo: estudiante@conectu.com</span>
              <span>Contraseña: 123456</span>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="platform">
      {toast && <div className="toast">{toast}</div>}

      <aside className="sidebar">
        <div className="sideBrand">conectU</div>

        <div className="userBox">
          <div className="avatar">{profile.nombre.charAt(0)}</div>
          <div>
            <strong>{profile.nombre}</strong>
            <span>{profile.programa}</span>
          </div>
        </div>

        <nav className="sideMenu">
          {menu.map((item) => (
            <button
              key={item.id}
              className={activeSection === item.id ? "active" : ""}
              onClick={() => {
                setActiveSection(item.id);
                setQuery("");
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <button className="logoutButton" onClick={handleLogout}>
          <LogOut size={18} />
          Cerrar sesión
        </button>
      </aside>

      <main className="content">
        <header className="contentHeader">
          <div>
            <span className="sectionTag">Panel del estudiante</span>
            <h1>{tituloSeccion}</h1>
          </div>

          {activeSection !== "inicio" && activeSection !== "perfil" && (
            <div className="searchInput">
              <Search size={18} />
              <input
                placeholder="Buscar dentro de esta sección..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          )}
        </header>

        {activeSection === "inicio" && (
          <section className="dashboard">
            <div className="welcomeCard">
              <span className="tag">Bienvenido</span>
              <h2>Hola, {profile.nombre.split(" ")[0]}</h2>
              <p>
                Desde este panel puedes explorar recomendaciones, cursos,
                recursos académicos, historias, oportunidades, grupos de estudio
                y tutorías.
              </p>
            </div>

            <div className="statsGrid">
              <Stat title="Profesores" value={profesores.length} />
              <Stat title="Cursos" value={cursos.length} />
              <Stat title="Recursos" value={recursos.length} />
              <Stat title="Historias" value={historias.length} />
            </div>

            <div className="quickGrid">
              <QuickCard
                icon={<GraduationCap />}
                title="Explorar profesores"
                text="Consulta experiencias académicas de otros estudiantes."
                onClick={() => setActiveSection("profesores")}
              />
              <QuickCard
                icon={<FolderOpen />}
                title="Ver repositorio"
                text="Encuentra guías, enlaces y materiales de estudio."
                onClick={() => setActiveSection("repositorio")}
              />
              <QuickCard
                icon={<Briefcase />}
                title="Buscar oportunidades"
                text="Revisa pasantías, intercambios y convocatorias."
                onClick={() => setActiveSection("oportunidades")}
              />
            </div>

            <section className="panel">
              <h2>Mis favoritos</h2>

              {favoritos.length === 0 ? (
                <p className="empty">Todavía no tienes elementos guardados.</p>
              ) : (
                <div className="cardsGrid">
                  {favoritos.map((fav) => (
                    <article className="smallCard" key={fav.id}>
                      <strong>{fav.titulo}</strong>
                      <p>{fav.tipo}</p>
                      <span>{fav.descripcion}</span>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </section>
        )}

        {activeSection === "profesores" && (
          <section className="sectionGrid">
            <div className="panel">
              <h2>Recomendaciones de profesores</h2>
              <p className="muted">
                Consulta opiniones académicas sobre claridad, metodología,
                exigencia y acompañamiento.
              </p>

              <div className="cardsGrid">
                {profesores.filter(matches).map((item) => (
                  <article className="card" key={item.id}>
                    <div className="cardTop">
                      <GraduationCap />
                      <span>⭐ {item.calificacion}</span>
                    </div>
                    <h3>{item.nombre}</h3>
                    <p>{item.materia}</p>
                    <span>{item.descripcion}</span>
                    <button onClick={() => toggleFavorito("Profesor", item)}>
                      <Heart size={16} />
                      Guardar
                    </button>
                  </article>
                ))}
              </div>
            </div>

            <form className="formPanel" onSubmit={agregarProfesor}>
              <h2>Publicar recomendación</h2>

              <label>Nombre del profesor</label>
              <input
                value={nuevoProfesor.nombre}
                onChange={(e) =>
                  setNuevoProfesor({ ...nuevoProfesor, nombre: e.target.value })
                }
              />

              <label>Materia</label>
              <input
                value={nuevoProfesor.materia}
                onChange={(e) =>
                  setNuevoProfesor({ ...nuevoProfesor, materia: e.target.value })
                }
              />

              <label>Calificación</label>
              <select
                value={nuevoProfesor.calificacion}
                onChange={(e) =>
                  setNuevoProfesor({
                    ...nuevoProfesor,
                    calificacion: e.target.value
                  })
                }
              >
                <option>5.0</option>
                <option>4.8</option>
                <option>4.5</option>
                <option>4.0</option>
                <option>3.5</option>
              </select>

              <label>Comentario académico</label>
              <textarea
                value={nuevoProfesor.descripcion}
                onChange={(e) =>
                  setNuevoProfesor({
                    ...nuevoProfesor,
                    descripcion: e.target.value
                  })
                }
              />

              <button type="submit">
                <Send size={16} />
                Publicar
              </button>
            </form>
          </section>
        )}

        {activeSection === "cursos" && (
          <section className="panel">
            <h2>Guía de cursos</h2>
            <p className="muted">
              Revisa materias, dificultad y consejos de otros estudiantes.
            </p>

            <div className="cardsGrid">
              {cursos.filter(matches).map((item) => (
                <article className="card" key={item.id}>
                  <div className="cardTop">
                    <BookOpen />
                    <span>{item.dificultad}</span>
                  </div>
                  <h3>{item.nombre}</h3>
                  <p>{item.consejo}</p>
                  <button onClick={() => toggleFavorito("Curso", item)}>
                    <Heart size={16} />
                    Guardar
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeSection === "repositorio" && (
          <section className="sectionGrid">
            <div className="panel">
              <h2>Repositorio académico</h2>
              <p className="muted">
                Comparte y consulta recursos útiles para estudiar.
              </p>

              <div className="cardsGrid">
                {recursos.filter(matches).map((item) => (
                  <article className="card" key={item.id}>
                    <div className="cardTop">
                      <FolderOpen />
                      <span>{item.tipo}</span>
                    </div>
                    <h3>{item.titulo}</h3>
                    <p>{item.materia}</p>
                    <span>{item.descripcion}</span>
                    <button onClick={() => toggleFavorito("Recurso", item)}>
                      <Heart size={16} />
                      Guardar
                    </button>
                  </article>
                ))}
              </div>
            </div>

            <form className="formPanel" onSubmit={agregarRecurso}>
              <h2>Subir recurso</h2>

              <label>Título</label>
              <input
                value={nuevoRecurso.titulo}
                onChange={(e) =>
                  setNuevoRecurso({ ...nuevoRecurso, titulo: e.target.value })
                }
              />

              <label>Tipo</label>
              <select
                value={nuevoRecurso.tipo}
                onChange={(e) =>
                  setNuevoRecurso({ ...nuevoRecurso, tipo: e.target.value })
                }
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
                onChange={(e) =>
                  setNuevoRecurso({ ...nuevoRecurso, materia: e.target.value })
                }
              />

              <label>Descripción</label>
              <textarea
                value={nuevoRecurso.descripcion}
                onChange={(e) =>
                  setNuevoRecurso({
                    ...nuevoRecurso,
                    descripcion: e.target.value
                  })
                }
              />

              <button type="submit">
                <Plus size={16} />
                Publicar recurso
              </button>
            </form>
          </section>
        )}

        {activeSection === "historias" && (
          <section className="sectionGrid">
            <div className="panel">
              <h2>Historias universitarias</h2>
              <p className="muted">
                Consejos, experiencias y aprendizajes contados por estudiantes.
              </p>

              <div className="cardsGrid">
                {historias.filter(matches).map((item) => (
                  <article className="card" key={item.id}>
                    <div className="cardTop">
                      <MessageCircle />
                      <span>{item.categoria}</span>
                    </div>
                    <h3>{item.titulo}</h3>
                    <p>{item.texto}</p>
                    <button onClick={() => toggleFavorito("Historia", item)}>
                      <Heart size={16} />
                      Guardar
                    </button>
                  </article>
                ))}
              </div>
            </div>

            <form className="formPanel" onSubmit={agregarHistoria}>
              <h2>Publicar historia</h2>

              <label>Título</label>
              <input
                value={nuevaHistoria.titulo}
                onChange={(e) =>
                  setNuevaHistoria({ ...nuevaHistoria, titulo: e.target.value })
                }
              />

              <label>Categoría</label>
              <select
                value={nuevaHistoria.categoria}
                onChange={(e) =>
                  setNuevaHistoria({
                    ...nuevaHistoria,
                    categoria: e.target.value
                  })
                }
              >
                <option>Consejo</option>
                <option>Experiencia</option>
                <option>Advertencia</option>
                <option>Oportunidad</option>
              </select>

              <label>Contenido</label>
              <textarea
                value={nuevaHistoria.texto}
                onChange={(e) =>
                  setNuevaHistoria({ ...nuevaHistoria, texto: e.target.value })
                }
              />

              <button type="submit">
                <Send size={16} />
                Publicar historia
              </button>
            </form>
          </section>
        )}

        {activeSection === "oportunidades" && (
          <section className="panel">
            <h2>Oportunidades</h2>
            <p className="muted">
              Pasantías, intercambios, convocatorias y eventos académicos.
            </p>

            <div className="cardsGrid">
              {oportunidades.filter(matches).map((item) => (
                <article className="card" key={item.id}>
                  <div className="cardTop">
                    <Briefcase />
                    <span>{item.tipo}</span>
                  </div>
                  <h3>{item.titulo}</h3>
                  <p>{item.descripcion}</p>
                  <span>Fecha límite: {item.fecha}</span>
                  <button onClick={() => toggleFavorito("Oportunidad", item)}>
                    <Heart size={16} />
                    Guardar
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeSection === "grupos" && (
          <section className="panel">
            <h2>Grupos de estudio</h2>
            <p className="muted">
              Únete a grupos por materia y comparte avances con otros
              estudiantes.
            </p>

            <div className="cardsGrid">
              {grupos.filter(matches).map((item) => (
                <article className="card" key={item.id}>
                  <div className="cardTop">
                    <Users />
                    <span>{item.integrantes} integrantes</span>
                  </div>
                  <h3>{item.nombre}</h3>
                  <p>{item.materia}</p>
                  <span>Horario: {item.horario}</span>
                  <button onClick={() => unirseGrupo(item.id)}>
                    <CheckCircle size={16} />
                    {gruposUnidos.includes(item.id) ? "Ya estás unido" : "Unirme"}
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeSection === "tutorias" && (
          <section className="panel">
            <h2>Tutorías</h2>
            <p className="muted">
              Reserva espacios de apoyo académico según la materia que necesites.
            </p>

            <div className="cardsGrid">
              {tutorias.filter(matches).map((item) => (
                <article className="card" key={item.id}>
                  <div className="cardTop">
                    <Calendar />
                    <span>{item.modalidad}</span>
                  </div>
                  <h3>{item.titulo}</h3>
                  <p>{item.materia}</p>
                  <span>Horario: {item.horario}</span>
                  <button onClick={() => reservarTutoria(item.id)}>
                    <CheckCircle size={16} />
                    {tutoriasReservadas.includes(item.id)
                      ? "Reservada"
                      : "Reservar"}
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeSection === "perfil" && (
          <section className="profileGrid">
            <form className="formPanel profilePanel">
              <h2>Mi perfil estudiantil</h2>

              <label>Nombre</label>
              <input
                value={profile.nombre}
                onChange={(e) =>
                  setProfile({ ...profile, nombre: e.target.value })
                }
              />

              <label>Correo</label>
              <input
                value={profile.correo}
                onChange={(e) =>
                  setProfile({ ...profile, correo: e.target.value })
                }
              />

              <label>Programa</label>
              <input
                value={profile.programa}
                onChange={(e) =>
                  setProfile({ ...profile, programa: e.target.value })
                }
              />

              <label>Semestre</label>
              <input
                value={profile.semestre}
                onChange={(e) =>
                  setProfile({ ...profile, semestre: e.target.value })
                }
              />

              <label>Intereses</label>
              <textarea
                value={profile.intereses}
                onChange={(e) =>
                  setProfile({ ...profile, intereses: e.target.value })
                }
              />

              <button type="button" onClick={() => showToast("Perfil actualizado.")}>
                Guardar cambios
              </button>
            </form>

            <div className="panel">
              <h2>Resumen del usuario</h2>
              <div className="profilePreview">
                <div className="bigAvatar">{profile.nombre.charAt(0)}</div>
                <h3>{profile.nombre}</h3>
                <p>{profile.correo}</p>
                <span>{profile.programa}</span>
                <span>Semestre {profile.semestre}</span>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div className="stat">
      <strong>{value}</strong>
      <span>{title}</span>
    </div>
  );
}

function QuickCard({ icon, title, text, onClick }) {
  return (
    <button className="quickCard" onClick={onClick}>
      <div>{icon}</div>
      <strong>{title}</strong>
      <span>{text}</span>
    </button>
  );
}

export default App;