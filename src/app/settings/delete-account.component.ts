import { Component } from '@angular/core';

import { ToasterService } from 'angular2-toaster';

import { ApiService } from 'jslib-common/abstractions/api.service';
import { CryptoService } from 'jslib-common/abstractions/crypto.service';
import { I18nService } from 'jslib-common/abstractions/i18n.service';
import { MessagingService } from 'jslib-common/abstractions/messaging.service';

import { PasswordVerificationRequest } from 'jslib-common/models/request/passwordVerificationRequest';

@Component({
    selector: 'app-delete-account',
    templateUrl: 'delete-account.component.html',
})
export class DeleteAccountComponent {
    masterPassword: string;
    formPromise: Promise<any>;

    constructor(private apiService: ApiService, private i18nService: I18nService,
        private toasterService: ToasterService, private cryptoService: CryptoService,
        private messagingService: MessagingService) { }

    async submit() {
        if (this.masterPassword == null || this.masterPassword === '') {
            this.toasterService.popAsync('error', this.i18nService.t('errorOccurred'),
                this.i18nService.t('masterPassRequired'));
            return;
        }

        const request = new PasswordVerificationRequest();
        request.masterPasswordHash = await this.cryptoService.hashPassword(this.masterPassword, null);
        try {
            this.formPromise = this.apiService.deleteAccount(request);
            await this.formPromise;
            this.toasterService.popAsync('success', this.i18nService.t('accountDeleted'),
                this.i18nService.t('accountDeletedDesc'));
            this.messagingService.send('logout');
        } catch { }
    }
}
