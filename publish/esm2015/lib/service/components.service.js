import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { isImageType, isVideoType, getFileType, isEqual } from './../theme/utils/util';
import * as i0 from "@angular/core";
import * as i1 from "ng-zorro-antd/modal";
let ComponentsService = class ComponentsService {
    constructor(injector, modal) {
        this.injector = injector;
        this.modal = modal;
        this.filePreview = (file) => __awaiter(this, void 0, void 0, function* () {
            if ((isImageType(file.type) || isEqual(getFileType(file.name), 'image')) && !file.url && !file.preview) {
                file.preview = yield this.getBase64(file.originFileObj);
                // console.log(file.preview)
            }
            const _url = file.url || file.preview;
            if (isImageType(file.type) || isEqual(getFileType(file.name), 'image')) {
                this.modal.create({
                    nzContent: `<img src="${_url}" width="100%"/>`,
                    nzFooter: null,
                });
            }
            else if (isVideoType(file.type) || isEqual(getFileType(file.name), 'video')) {
                this.modal.create({
                    nzContent: `<video src="${_url}" controls="controls" width="100%">您的浏览器不支持视频播放</video>`,
                    nzFooter: null,
                });
            }
            else {
                // this.injector.get<NzModalService>(NzModalService).create({
                //   nzContent: `<p class="text-center" >暂时无法查看实时文件</p>`,
                //   nzFooter: null,
                // });
                window.open(_url);
            }
        });
    }
    getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
};
ComponentsService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ComponentsService_Factory() { return new ComponentsService(i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i1.NzModalService)); }, token: ComponentsService, providedIn: "root" });
ComponentsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ComponentsService);
export { ComponentsService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctem9lcy9saWIvc2VydmljZS9jb21wb25lbnRzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxlQUFlLENBQUM7QUFJckQsT0FBTyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxNQUFNLHVCQUF1QixDQUFBOzs7QUFRdEYsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7SUFFNUIsWUFDVSxRQUFrQixFQUNsQixLQUFxQjtRQURyQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBWS9CLGdCQUFXLEdBQUcsQ0FBTyxJQUFrQixFQUFFLEVBQUU7WUFDekMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUN0RyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsYUFBYyxDQUFDLENBQUM7Z0JBQ3pELDRCQUE0QjthQUM3QjtZQUNELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUV0QyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUU7Z0JBQ3RFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO29CQUNoQixTQUFTLEVBQUUsYUFBYSxJQUFJLGtCQUFrQjtvQkFDOUMsUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO2FBQ0o7aUJBQU0sSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxFQUFFO2dCQUM3RSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztvQkFDaEIsU0FBUyxFQUFFLGVBQWUsSUFBSSx5REFBeUQ7b0JBQ3ZGLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLDZEQUE2RDtnQkFDN0QseURBQXlEO2dCQUN6RCxvQkFBb0I7Z0JBQ3BCLE1BQU07Z0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUNsQjtRQUNILENBQUMsQ0FBQSxDQUFDO0lBbkNFLENBQUM7SUFFTCxTQUFTLENBQUMsSUFBVTtRQUNsQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3JDLE1BQU0sTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7WUFDaEMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDN0MsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0EyQkYsQ0FBQTs7QUF6Q1ksaUJBQWlCO0lBSDdCLFVBQVUsQ0FBQztRQUNWLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUM7R0FDVyxpQkFBaUIsQ0F5QzdCO1NBekNZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE56TW9kYWxTZXJ2aWNlIH0gZnJvbSAnbmctem9ycm8tYW50ZC9tb2RhbCc7XHJcbmltcG9ydCB7IE56VXBsb2FkRmlsZSB9IGZyb20gJ25nLXpvcnJvLWFudGQvdXBsb2FkJztcclxuaW1wb3J0IHsgRmlsZUNoZWNrQ29tcG9uZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9maWxlLWNoZWNrL2ZpbGUtY2hlY2suY29tcG9uZW50JztcclxuaW1wb3J0IHsgaXNJbWFnZVR5cGUsIGlzVmlkZW9UeXBlLCBnZXRGaWxlVHlwZSwgaXNFcXVhbCB9IGZyb20gJy4vLi4vdGhlbWUvdXRpbHMvdXRpbCdcclxuXHJcblxyXG5cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudHNTZXJ2aWNlIHtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcclxuICAgIHByaXZhdGUgbW9kYWw6IE56TW9kYWxTZXJ2aWNlLFxyXG4gICkgeyB9XHJcblxyXG4gIGdldEJhc2U2NChmaWxlOiBGaWxlKTogUHJvbWlzZTxzdHJpbmcgfCBBcnJheUJ1ZmZlciB8IG51bGw+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG4gICAgICByZWFkZXIub25sb2FkID0gKCkgPT4gcmVzb2x2ZShyZWFkZXIucmVzdWx0KTtcclxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBlcnJvciA9PiByZWplY3QoZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmaWxlUHJldmlldyA9IGFzeW5jIChmaWxlOiBOelVwbG9hZEZpbGUpID0+IHtcclxuICAgIGlmICgoaXNJbWFnZVR5cGUoZmlsZS50eXBlKSB8fCBpc0VxdWFsKGdldEZpbGVUeXBlKGZpbGUubmFtZSksICdpbWFnZScpKSAmJiAhZmlsZS51cmwgJiYgIWZpbGUucHJldmlldykge1xyXG4gICAgICBmaWxlLnByZXZpZXcgPSBhd2FpdCB0aGlzLmdldEJhc2U2NChmaWxlLm9yaWdpbkZpbGVPYmohKTtcclxuICAgICAgLy8gY29uc29sZS5sb2coZmlsZS5wcmV2aWV3KVxyXG4gICAgfVxyXG4gICAgY29uc3QgX3VybCA9IGZpbGUudXJsIHx8IGZpbGUucHJldmlldztcclxuXHJcbiAgICBpZiAoaXNJbWFnZVR5cGUoZmlsZS50eXBlKSB8fCBpc0VxdWFsKGdldEZpbGVUeXBlKGZpbGUubmFtZSksICdpbWFnZScpKSB7XHJcbiAgICAgIHRoaXMubW9kYWwuY3JlYXRlKHtcclxuICAgICAgICBuekNvbnRlbnQ6IGA8aW1nIHNyYz1cIiR7X3VybH1cIiB3aWR0aD1cIjEwMCVcIi8+YCxcclxuICAgICAgICBuekZvb3RlcjogbnVsbCxcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2UgaWYgKGlzVmlkZW9UeXBlKGZpbGUudHlwZSkgfHwgaXNFcXVhbChnZXRGaWxlVHlwZShmaWxlLm5hbWUpLCAndmlkZW8nKSkge1xyXG4gICAgICB0aGlzLm1vZGFsLmNyZWF0ZSh7XHJcbiAgICAgICAgbnpDb250ZW50OiBgPHZpZGVvIHNyYz1cIiR7X3VybH1cIiBjb250cm9scz1cImNvbnRyb2xzXCIgd2lkdGg9XCIxMDAlXCI+5oKo55qE5rWP6KeI5Zmo5LiN5pSv5oyB6KeG6aKR5pKt5pS+PC92aWRlbz5gLFxyXG4gICAgICAgIG56Rm9vdGVyOiBudWxsLFxyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIHRoaXMuaW5qZWN0b3IuZ2V0PE56TW9kYWxTZXJ2aWNlPihOek1vZGFsU2VydmljZSkuY3JlYXRlKHtcclxuICAgICAgLy8gICBuekNvbnRlbnQ6IGA8cCBjbGFzcz1cInRleHQtY2VudGVyXCIgPuaaguaXtuaXoOazleafpeeci+WunuaXtuaWh+S7tjwvcD5gLFxyXG4gICAgICAvLyAgIG56Rm9vdGVyOiBudWxsLFxyXG4gICAgICAvLyB9KTtcclxuICAgICAgd2luZG93Lm9wZW4oX3VybClcclxuICAgIH1cclxuICB9O1xyXG59XHJcbiJdfQ==