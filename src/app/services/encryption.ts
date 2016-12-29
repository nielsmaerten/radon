/// <reference path="../../../typings/index.d.ts" />
import { PlainStory, EncryptedStory } from '../model/radon';
import { StorageService } from './storage';
import * as sjcl from 'sjcl';

export class EncryptionService {
  private EncryptionKey: sjcl.BitArray;
  private Salt: string;


  /** @ngInject */
  constructor(StorageService: StorageService) {
    StorageService.onSaltSet((salt) => {
      this.Salt = salt;
    });
  }

  public encryptStory(PlainStory: PlainStory): EncryptedStory {
    if (!this.isReady()) { throw 'Encryption key not loaded'; }
    let x = sjcl.encrypt(this.EncryptionKey, PlainStory.Contents);
    return new EncryptedStory(PlainStory.Date, x as any as string);
  }

  public decryptStory(EncryptedStory: EncryptedStory): PlainStory {
    if (!this.isReady()) { throw 'Encryption key not loaded'; }
    let decrypted = sjcl.decrypt(this.EncryptionKey, EncryptedStory.Contents as any as sjcl.SjclCipherEncrypted);
    return new PlainStory(EncryptedStory.Date, decrypted);
  }

  public loadEncryptionKey(passphrase: string): void {
    let salt = this.loadSalt();
    this.EncryptionKey = sjcl.misc.pbkdf2(passphrase, salt, 1000, 256, sjcl.misc.hmac);
  }

  public isReady(): boolean {
    return this.EncryptionKey !== undefined && this.EncryptionKey.length > 0;
  }

  public hasSalt(): boolean {
    return this.Salt != null;
  }

  private loadSalt(): sjcl.BitArray {
    if (!this.hasSalt()) { throw 'Salt not initialized!'; }
    return sjcl.codec.utf8String.toBits(this.Salt);
  }
};
