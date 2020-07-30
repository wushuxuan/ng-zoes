import { __decorate } from "tslib";
import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { getFileType } from './../../theme/utils/util';
let FileCheckComponent = class FileCheckComponent {
    constructor() {
        this.fileList = [];
        this.index = 0;
        this.show = true;
    }
    ngOnInit() {
    }
    getType(name) {
        return getFileType(name);
    }
    close() {
        this.show = false;
    }
    changeIndex(type) {
        switch (type) {
            case 'next':
                if (this.index + 1 >= this.fileList.length) {
                    this.index = 0;
                }
                else {
                    this.index = this.index + 1;
                }
                break;
            case 'perv':
                if (this.index - 1 < 0) {
                    this.index = this.fileList.length - 1;
                }
                else {
                    this.index = this.index - 1;
                }
                break;
        }
    }
};
__decorate([
    ViewChild('element', { read: ViewContainerRef })
], FileCheckComponent.prototype, "element", void 0);
__decorate([
    Input()
], FileCheckComponent.prototype, "fileList", void 0);
__decorate([
    Input()
], FileCheckComponent.prototype, "index", void 0);
FileCheckComponent = __decorate([
    Component({
        selector: 'az-file-view',
        template: "<div class=\"file-view-container\" *ngIf=\"show\">\n  <div class=\"file-view-container-close\">\n    <i (click)=\"close()\" nz-icon nzType=\"close\" nzTheme=\"outline\"></i>\n  </div>\n  <div class=\"file-view-container-content\">\n    <div class='file-view-container-icon'>\n      <i (click)=\"changeIndex('perv')\" nz-icon nzType=\"left\" nzTheme=\"outline\"></i>\n    </div>\n    <div class='file-view-container-content-view'>\n      <div *ngIf=\"fileList && fileList.length;else empty\">\n        <div [ngSwitch]=\"getType(fileList[index].name)\">\n          <p *ngSwitchCase=\"'image'\">\n            <img [src]=\"fileList[index].url?fileList[index].url:fileList[index].thumbUrl\" />\n          </p>\n          <p *ngSwitchCase=\"'video'\">\n            <video [src]=\"fileList[index].url?fileList[index].url:fileList[index].thumbUrl\" controls=\"controls\"\n              width=\"100%\">\u60A8\u7684\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u89C6\u9891\u64AD\u653E</video>\n          </p>\n          <p *ngSwitchDefault>\n            <span>\u6682\u4E0D\u652F\u6301\u67E5\u770B</span>\n          </p>\n        </div>\n        <p>{{index+1}} / {{fileList.length}} </p>\n      </div>\n      <ng-template #empty>\n        <nz-empty nzNotFoundImage=\"simple\"></nz-empty>\n      </ng-template>\n\n    </div>\n    <div class='file-view-container-icon'><i (click)=\"changeIndex('next')\" nz-icon nzType=\"right\" nzTheme=\"outline\"></i>\n    </div>\n  </div>\n</div>\n",
        styles: [".file-view-container{-webkit-box-align:center;-webkit-overflow-scrolling:touch;background-color:rgba(12,15,19,.5);display:flex;flex-direction:column;height:100vh;left:0;overflow-y:auto;padding:24px;position:fixed;right:0;top:0;width:100%;z-index:109}.file-view-container .file-view-container-close{background:0 0;border-color:transparent;box-shadow:none;color:#fff;font-size:30px;text-align:right;width:100%}.file-view-container .file-view-container-content{display:flex;flex-flow:row;height:100%}.file-view-container .file-view-container-content .file-view-container-content-view{border-radius:6px;display:flex;flex:1;height:80%;margin:24px;padding:15px;width:calc(100vw - 160px)}.file-view-container .file-view-container-content .file-view-container-content-view>div{display:flex;flex-direction:column;justify-content:center;width:100%}.file-view-container .file-view-container-content .file-view-container-content-view img{max-height:75vh;max-width:112.49vh;min-height:300px;min-width:449.958px}.file-view-container .file-view-container-content .file-view-container-content-view p{color:#fff;text-align:center}.file-view-container .file-view-container-content .file-view-container-icon{align-items:center;color:#fff;display:flex;font-size:35px;height:70%;justify-content:center;opacity:.6}.file-view-container .file-view-container-content .file-view-container-icon:hover{opacity:1}i{cursor:pointer}"]
    })
], FileCheckComponent);
export { FileCheckComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1jaGVjay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZy16b2VzL2xpYi9jb21wb25lbnRzL2ZpbGUtY2hlY2svZmlsZS1jaGVjay5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV0RixPQUFPLEVBQTRCLFdBQVcsRUFBVyxNQUFNLDBCQUEwQixDQUFBO0FBT3pGLElBQWEsa0JBQWtCLEdBQS9CLE1BQWEsa0JBQWtCO0lBTzdCO1FBSlMsYUFBUSxHQUFtQixFQUFFLENBQUM7UUFDOUIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUUzQixTQUFJLEdBQVcsSUFBSSxDQUFDO0lBQ0osQ0FBQztJQUVqQixRQUFRO0lBQ1IsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFJO1FBQ1YsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQTtJQUNuQixDQUFDO0lBR0QsV0FBVyxDQUFDLElBQUk7UUFDZCxRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssTUFBTTtnQkFDVCxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO29CQUMxQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQTtpQkFDZjtxQkFBTTtvQkFDTCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFBO2lCQUM1QjtnQkFDRCxNQUFNO1lBRVIsS0FBSyxNQUFNO2dCQUNULElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtpQkFDdEM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQTtpQkFDNUI7Z0JBQ0QsTUFBTTtTQUNUO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUF2Q21EO0lBQWpELFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQzttREFBa0M7QUFFMUU7SUFBUixLQUFLLEVBQUU7b0RBQStCO0FBQzlCO0lBQVIsS0FBSyxFQUFFO2lEQUFtQjtBQUpoQixrQkFBa0I7SUFMOUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGNBQWM7UUFDeEIsbThDQUEwQzs7S0FFM0MsQ0FBQztHQUNXLGtCQUFrQixDQXdDOUI7U0F4Q1ksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE56VXBsb2FkRmlsZSB9IGZyb20gJy4uL3VwbG9hZC9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgaXNJbWFnZVR5cGUsIGlzVmlkZW9UeXBlLCBnZXRGaWxlVHlwZSwgaXNFcXVhbCB9IGZyb20gJy4vLi4vLi4vdGhlbWUvdXRpbHMvdXRpbCdcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXotZmlsZS12aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbGUtY2hlY2suY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9maWxlLWNoZWNrLmNvbXBvbmVudC5zdHlsJ11cbn0pXG5leHBvcnQgY2xhc3MgRmlsZUNoZWNrQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQFZpZXdDaGlsZCgnZWxlbWVudCcsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiB9KSBwdWJsaWMgZWxlbWVudDogVmlld0NvbnRhaW5lclJlZjtcblxuICBASW5wdXQoKSBmaWxlTGlzdDogTnpVcGxvYWRGaWxlW10gPSBbXTtcbiAgQElucHV0KCkgaW5kZXg6IG51bWJlciA9IDA7XG5cbiAgc2hvdzpib29sZWFuID0gdHJ1ZTtcbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgfVxuXG4gIGdldFR5cGUobmFtZSkge1xuICAgIHJldHVybiBnZXRGaWxlVHlwZShuYW1lKVxuICB9XG5cbiAgY2xvc2UoKXtcbiAgICB0aGlzLnNob3cgPSBmYWxzZVxuICB9XG5cblxuICBjaGFuZ2VJbmRleCh0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICduZXh0JzpcbiAgICAgICAgaWYgKHRoaXMuaW5kZXggKyAxID49IHRoaXMuZmlsZUxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5pbmRleCA9IDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5pbmRleCArIDFcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAncGVydic6XG4gICAgICAgIGlmICh0aGlzLmluZGV4IC0gMSA8IDApIHtcbiAgICAgICAgICB0aGlzLmluZGV4ID0gdGhpcy5maWxlTGlzdC5sZW5ndGggLSAxXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5pbmRleCA9IHRoaXMuaW5kZXggLSAxXG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG4iXX0=