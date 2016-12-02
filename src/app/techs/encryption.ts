/// <reference path="../../../typings/index.d.ts" />
import { PlainStory, EncryptedStory } from '../model/radon';
import * as sjcl from 'sjcl';

export class EncryptionService {
  private EncryptionKey: sjcl.BitArray;
  private Salt: string;


  /** @ngInject */
  constructor() {
    this.Salt = 'TODO'; // todo
  }

  public EncryptStory(PlainStory: PlainStory): EncryptedStory {
    if (!this.IsReady()) { throw 'Encryption key not loaded'; }
    let x = sjcl.encrypt(this.EncryptionKey, PlainStory.Contents);
    return new EncryptedStory(PlainStory.Date, x as any as string);
  }

  public DecryptStory(EncryptedStory: EncryptedStory): PlainStory {
    if (!this.IsReady()) { throw 'Encryption key not loaded'; }
    let decrypted = sjcl.decrypt(this.EncryptionKey, EncryptedStory.Contents as any as sjcl.SjclCipherEncrypted);
    return new PlainStory(EncryptedStory.Date, decrypted);
  }

  public LoadEncryptionKey(passphrase: string): void {
    let salt = this.LoadSalt();
    this.EncryptionKey = sjcl.misc.pbkdf2(passphrase, salt, 1000, 256, sjcl.misc.hmac);
  }

  public IsReady(): boolean {
    return this.EncryptionKey !== undefined && this.EncryptionKey.length > 0;
  }

  private LoadSalt(): sjcl.BitArray {
    return sjcl.codec.utf8String.toBits(this.Salt);
  }
};
