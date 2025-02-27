import { getToken } from "./authService";

const API_URL = "https://zone01normandie.org/api/graphql-engine/v1/graphql";

// Fonction pour faire un appel API générique
const fetchData = async (query: string) => {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${getToken()}`,
            },
            body: JSON.stringify({ query }),
        });

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

// Fonction spécifique pour récupérer les données utilisateur
const fetchUserData = () => {
    const USER_QUERY = `
    query {
        user {
            labels {
                labelName
            }
            attrs
            login
            totalUp
            totalDown
        }
    }`;
    return fetchData(USER_QUERY);
};

// Fonction spécifique pour récupérer les projets
const fetchProjectsData = (id: number) => {
    const PROJECT_QUERY = `
    query {
    transaction(
        where: {
            transaction_type: { type: { _eq: "xp" } },
            eventId: { _eq: ${id} }
        }, 
        order_by: { createdAt: desc }
    ) {
        amount
        isBonus
        attrs
        eventId
        createdAt
        object {
            name
            type
        }
    }
}`;
    return fetchData(PROJECT_QUERY);
};

const fetchCursusData = () => {
    const CURSUS_QUERY = `
    query {
         user {
            events(where: { event: { object: { type: { _in: ["piscine", "module"] } } } }) {
            event {
            id
            object {
                name
                type
                    }
                }
            }
        }
    }`;
    return fetchData(CURSUS_QUERY);
};

const fetchCursusInfoData = (id: number) => {
    const CURSUS_INFO_QUERY = `
query {
  event(where: { id: { _eq: ${id} } }) {
    id
    startAt
    endAt
    object {
      name
      type
    }
    parent {
      id
      object {
        name
        type
      }
    }
  }
}`;

    return fetchData(CURSUS_INFO_QUERY);
};

const fetchAuditData = (id: string) => {
    const AUDIT_QUERY = `
query {
    audit(
        where: { 
            auditorLogin: { _eq: "${id}" },
            _or: [
                { grade: { _is_null: true }, resultId: { _is_null: true } },  # Cas 1 : Audit en cours
                { grade: { _is_null: false }, resultId: { _is_null: false } } # Cas 2 : Audit complété par toi
            ]
        }, 
        order_by: [{ group: { createdAt: desc } }], 
        limit: 70
    ) {
        private {
            code
        }
        grade
        resultId
        group {
            captainLogin
            createdAt
            object {
                name
                type
            }
        }
    }
}`
    return fetchData(AUDIT_QUERY)
}

const fetchXpByCursus = (id: number) => {
    const XP_QUERY = `
    query {
    transaction_aggregate(where: { 
    type: { _eq: "xp" },
    eventId: {_eq: ${id}}
  }) {
    aggregate {
      sum {
        amount
      }
    }
  }
}`

    return fetchData(XP_QUERY)
}

const fetchUserLevelByCursus = (login: string, id: number) => {
    const LEVEL_QUERY = `
    query {
    event_user(where: { userLogin: { _eq: "${login}" }, eventId: { _eq: ${id} } }) {
    level
  }
}`

    return fetchData(LEVEL_QUERY)
}

const fetchLastProject = () => {
    const LAST_PROJECT_QUERY = `
    query {
  progress(
    where: { 
      object: { type: { _eq: "project" } }, 
      isDone: { _eq: false } 
    }
    order_by: { createdAt: desc }
    limit: 1 
  ) {
    createdAt
    object {
      name
      type
    }
    isDone
  }
}`

    return fetchData(LAST_PROJECT_QUERY)
}

export { fetchUserData, fetchProjectsData, fetchCursusData, fetchCursusInfoData, fetchAuditData, fetchXpByCursus, fetchUserLevelByCursus, fetchLastProject };

// query {
//     transaction(where: {transaction_type: {type: {_eq: "xp"}}, object: {type: {_eq: "project"}}}, order_by: {createdAt: desc}) {
//         amount
//         isBonus
//         createdAt
//         object {
//             name
//         }
//     }
// }