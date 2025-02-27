interface UserAttrs {
    Phone: string;
    email: string;
    gender: string;
    country: string;
    foundus: string;
    attentes: string;
    lastName: string;
    Situation: string;
    firstName: string;
    addressCity: string;
    dateOfBirth: string;
    emergencyTel: string;
    placeOfBirth: string;
    addressStreet: string;
    addressCountry: string;
    countryOfBirth: string;
    addressPostalCode: string;
    emergencyLastName: string;
    mailcheckAccepted: boolean;
    emergencyFirstName: string;
    emergencyAffiliation: string;
    addressComplementStreet: string;
}

interface User {
    attrs: UserAttrs;
    login: string;
    totalUp: number;
    totalDown: number
    labels: { labelName: string }[];
}

interface Project {
    amount: number;
    eventId: number
    attrs: {
        reason: string
    }
    isBonus: boolean;
    createdAt: string;
    object: {
        name: string;
        type: string
    };
}


interface UserContextType {
    user: { user: User[] } | null;
    loader: boolean;
    projects: Project[];
    cursus: Cursus[];
    audit: Audit[];
    xps: number | null;
    level: number | null;
    selectedCursus: number | null;
    project: LastProject | undefined;
    setSelectedCursus: React.Dispatch<React.SetStateAction<number | null>>;
    fetchData: <T>(query: string, setState: React.Dispatch<React.SetStateAction<T>>) => Promise<void>;
}

interface EventObject {
    name: string;
    type: "piscine" | "module";
}

interface ParentObject {
    id: number
    object: {
        name: string,
        type: string,
    }
}

interface Event {
    id: number;
    startAt: string;
    endAt: string;
    object: EventObject;
    parent: ParentObject
}

interface Cursus {
    event: Event[];
}


interface Audit {
    grade: number | null;
    resultId: number | null;
    private: { code: string };
    group: {
        captainLogin: string;
        createdAt: string;
        object: {
            name: string;
            type: string;
        };
    };
}

interface LastProject {
    createdAt: string,
    isDone: boolean,
    object: {
        name: string,
        type: string,
    }
}

type EventData = {
    event: {
        id: number;
    };
};