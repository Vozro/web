import {
    Component,
    EventEmitter,
    Output,
} from '@angular/core';

import { CollectionService } from 'jslib-common/abstractions/collection.service';
import { FolderService } from 'jslib-common/abstractions/folder.service';
import { StorageService } from 'jslib-common/abstractions/storage.service';
import { UserService } from 'jslib-common/abstractions/user.service';

import { GroupingsComponent as BaseGroupingsComponent } from 'jslib-angular/components/groupings.component';

@Component({
    selector: 'app-vault-groupings',
    templateUrl: 'groupings.component.html',
})
export class GroupingsComponent extends BaseGroupingsComponent {
    @Output() onSearchTextChanged = new EventEmitter<string>();

    searchText: string = '';
    searchPlaceholder: string = null;

    constructor(collectionService: CollectionService, folderService: FolderService,
        storageService: StorageService, userService: UserService) {
        super(collectionService, folderService, storageService, userService);
    }

    searchTextChanged() {
        this.onSearchTextChanged.emit(this.searchText);
    }
}
