import { __awaiter, __decorate } from "tslib";
import { Injectable } from '@angular/core';
import ImageCompressor from 'image-compressor.js';
import * as i0 from "@angular/core";
let FilesServiceService = class FilesServiceService {
    constructor() {
        this.compress = (file, quality, convertSize) => __awaiter(this, void 0, void 0, function* () {
            if (!/image\/\w+/.test(file.type)) {
                return false;
            }
            if (file.size < convertSize) {
                return false;
            }
            // 进行图片压缩
            return new Promise((resolve, reject) => {
                new ImageCompressor().compress(file, {
                    quality: quality,
                    maxWidth: 1000,
                    maxHeight: 1000,
                    convertSize: 614400,
                    success(result) {
                        resolve(new File([result], file.name, { type: file.type }));
                    },
                    error(e) {
                        reject(e);
                    }
                });
            });
        });
    }
};
FilesServiceService.ɵprov = i0.ɵɵdefineInjectable({ factory: function FilesServiceService_Factory() { return new FilesServiceService(); }, token: FilesServiceService, providedIn: "root" });
FilesServiceService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FilesServiceService);
export { FilesServiceService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMtc2VydmljZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmctem9lcy9saWIvY29tcG9uZW50cy91cGxvYWQvZmlsZXMtc2VydmljZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sZUFBZSxNQUFNLHFCQUFxQixDQUFBOztBQUtqRCxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQUU5QjtRQUVBLGFBQVEsR0FBRyxDQUFPLElBQUksRUFBRSxPQUFPLEVBQUUsV0FBVyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNqQyxPQUFPLEtBQUssQ0FBQzthQUNkO1lBQ0QsSUFBSSxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsRUFBRTtnQkFDM0IsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUNELFNBQVM7WUFDVCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUNyQyxJQUFJLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7b0JBQ25DLE9BQU8sRUFBRSxPQUFPO29CQUNoQixRQUFRLEVBQUUsSUFBSTtvQkFDZCxTQUFTLEVBQUUsSUFBSTtvQkFDZixXQUFXLEVBQUUsTUFBTTtvQkFDbkIsT0FBTyxDQUFDLE1BQU07d0JBQ1osT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFBO29CQUN6RCxDQUFDO29CQUNELEtBQUssQ0FBQyxDQUFDO3dCQUNMLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDWCxDQUFDO2lCQUNGLENBQUMsQ0FBQTtZQUNKLENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFBLENBQUE7SUF4QmUsQ0FBQztDQWtDbEIsQ0FBQTs7QUFwQ1ksbUJBQW1CO0lBSC9CLFVBQVUsQ0FBQztRQUNWLFVBQVUsRUFBRSxNQUFNO0tBQ25CLENBQUM7R0FDVyxtQkFBbUIsQ0FvQy9CO1NBcENZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IEltYWdlQ29tcHJlc3NvciBmcm9tICdpbWFnZS1jb21wcmVzc29yLmpzJ1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgRmlsZXNTZXJ2aWNlU2VydmljZSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkgeyB9XHJcblxyXG4gIGNvbXByZXNzID0gYXN5bmMgKGZpbGUsIHF1YWxpdHksIGNvbnZlcnRTaXplKSA9PiB7XHJcbiAgICBpZiAoIS9pbWFnZVxcL1xcdysvLnRlc3QoZmlsZS50eXBlKSkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBpZiAoZmlsZS5zaXplIDwgY29udmVydFNpemUpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy8g6L+b6KGM5Zu+54mH5Y6L57ypXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICBuZXcgSW1hZ2VDb21wcmVzc29yKCkuY29tcHJlc3MoZmlsZSwge1xyXG4gICAgICAgIHF1YWxpdHk6IHF1YWxpdHksICAvL+WOi+e8qeWKm+W6plxyXG4gICAgICAgIG1heFdpZHRoOiAxMDAwLCAvL+i+k+WHuuWbvuWDj+eahOacgOWkp+WuveW6piAgbWluV2lkdGggIOaMh+WumuWuveW6piB3aWR0aFxyXG4gICAgICAgIG1heEhlaWdodDogMTAwMCwgIC8v6L6T5Ye65Zu+5YOP55qE5pyA5aSn6auY5bqmICBtaW5IZWlnaHQgICDmjIflrprpq5jluqYgaGVpZ2h0XHJcbiAgICAgICAgY29udmVydFNpemU6IDYxNDQwMCwgLy8oNjE0NDAw5a2X6IqCKei2hei/hzYwMGti5Y6L57ypICDotoXov4fov5nkuKrlgLznmoRQTkfmlofku7blsIbooqvovazmjaLkuLpqcGVn5paH5Lu244CC6KaB56aB55So5a6D77yM5Y+q6ZyA5bCG5YC86K6+572u5Li65peg56m35aSnXHJcbiAgICAgICAgc3VjY2VzcyhyZXN1bHQpIHtcclxuICAgICAgICAgIHJlc29sdmUobmV3IEZpbGUoW3Jlc3VsdF0sIGZpbGUubmFtZSx7dHlwZTpmaWxlLnR5cGV9KSlcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yKGUpIHtcclxuICAgICAgICAgIHJlamVjdChlKVxyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH0pXHJcbiAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG59XHJcbiJdfQ==