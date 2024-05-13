export class Task {
  id: number; 
  title: string;
  importance: boolean;
  description: string;
  tags: Tag;
  dateOfCompletion: Date;

  constructor(
      id: number,
      title: string,
      importance: boolean,
      description: string,
      tags: Tag,
      dateOfCompletion: Date
  ) {
      this.id = id; 
      this.title = title;
      this.importance = importance;
      this.description = description;
      this.tags = tags;
      this.dateOfCompletion = dateOfCompletion;
  }
}
export interface Tag{
  productivity:boolean
  completed:boolean;
  education:boolean;
  health:boolean;
  quickly:boolean;
  [key: string]: boolean;  
}
