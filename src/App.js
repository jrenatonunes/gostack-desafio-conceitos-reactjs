import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect( () => {
    api.get("repositories")
    .then(repositories => setRepositories(repositories.data));
  }, []);
  

  async function handleAddRepository() {
    const now = Date.now();
    const newRepository = {
      title: `Título Novo ${now}`,
      url: "https://github.com/users/userio",
      techs: ["java", "javascript", "nodejs", "reactjs"]
    };

    const response = await api.post("repositories", newRepository);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div className="container">
      <ul data-testid="repository-list">
        { 
          repositories.map( (repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ) )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
