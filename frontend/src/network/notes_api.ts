const fetchData = async (input: RequestInfo, init?: RequestInit) => {
  const response = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}` + input,
    init
  );
  console.log("1st url::", `${process.env.REACT_APP_BACKEND_URL}` + input);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    console.log("1st error :::: ", errorBody);
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
};

export const fetchNotes = async () => {
  const resp = await fetchData("/api/notes", {
    credentials: "include",
    method: "GET",
  });
  return resp.json();
};

export const getLoggedInUser = async () => {
  const resp = await fetchData("/api/users", {
    credentials: "include",
    method: "GET",
  });
  return resp.json();
};

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export const signUp = async (credentials: SignUpCredentials) => {
  const resp = await fetchData("/api/users/signup", {
    credentials: "include",
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return resp.json();
};

export interface LoginCredentials {
  username: string;
  password: string;
}

export const login = async (credentials: LoginCredentials) => {
  const resp = await fetchData("/api/users/login", {
    credentials: "include",
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return resp.json();
};

export const logout = async () => {
  await fetchData("/api/users/logout", {
    credentials: "include",
    method: "POST",
  });
};

export interface NoteInput {
  title: string;
  text?: string;
}

export const createNote = async (note: NoteInput) => {
  const resp = await fetchData("/api/notes", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return resp.json();
};

export const deleteSingleNote = async (noteId: string) => {
  await fetchData("/api/notes/" + noteId, {
    credentials: "include",
    method: "DELETE",
  });
};

export const updateSingleNote = async (noteId: string, note: NoteInput) => {
  const resp = await fetchData("/api/notes/" + noteId, {
    credentials: "include",
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  return resp.json();
};
