export default interface ISession {
  id: number;
  duration: number;
  date: string;
  comment?: string;
  activity_name: string;
  activity_met: number;
}
