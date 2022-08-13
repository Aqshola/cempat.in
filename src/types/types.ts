export type UserData = {
  user_id: string;
  email: string;
  username: string;
};

export type Location = {
  lng: number;
  lat: number;
  place_name?: string | null;
};

export type Result<R, E> = {
  data: R;
  error: E;
};

export type ApiLocation = Location & {
  id?: number;
  jml_cerita?: number;
};

export type Story = Location & {
  title: string;
  content: string;
  id: string;
  user_id: string;
  created_at:string;
  user:User
};

export type User= {
  user_id:string;
  username:string
}
