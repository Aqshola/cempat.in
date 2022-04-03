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

export type Result<R,E>={
  data:R;
  error:E;
}