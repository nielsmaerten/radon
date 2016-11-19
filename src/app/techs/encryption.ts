/// <reference path="../../../typings/index.d.ts" />
import {PlainStory, EncryptedStory} from '../model/qiip';
import * as sjcl from 'sjcl';

export class EncryptionService {
    private EncryptionKey: sjcl.BitArray;
    private Salt: string;


    /** @ngInject */
    constructor() {
        this.Salt = 'TODO'; // todo
    }

    public EncryptStory(PlainStory: PlainStory): EncryptedStory {
        throw 'Not implemented';
    }

    public DecryptStory(EncryptedStory: EncryptedStory): PlainStory {
        throw 'Not implemented';
    }

    public LoadEncryptionKey(passphrase: string): void {
        let salt = this.LoadSalt();
        this.EncryptionKey = sjcl.misc.pbkdf2(passphrase, salt, 1000, 256, sjcl.misc.hmac);
    }

    private LoadSalt(): sjcl.BitArray {
        return sjcl.codec.utf8String.toBits(this.Salt);
    }
};
