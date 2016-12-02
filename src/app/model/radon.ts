export class Story {
  Contents: string;
  Date: Date;

  constructor(Date: Date, Contents: string) {
    this.Contents = Contents;
    this.Date = Date;
  }
}

export class EncryptedStory extends Story { }


export class PlainStory extends Story { }

