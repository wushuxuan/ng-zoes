<h1>公共服务 ComponentsService</h1>


### 如何使用

```ts
import { ComponentsService } from 'zoe'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

    constructor(
        private comService: ComponentsService
    ) { }

    handlePreview = (file: NzUploadFile) => {
        this.comService.filePreview(file)
    };
}
```

### 说明
| 服务名       | 说明           |  使用 |
| ------------- |:-------------:|:-------------: |
| `filePreview`     | 查看文件 | `this.comService.filePreview(file)` |
| `LoadingService`     | 全局loading | `this.loadingService.create(options:`[loading options](./components/loading.md)`) ` |

### 详细说明
#### LoadingService
    - this.loadingService.create(options?:[loading options])  加载全局loading
    - this.loadingService.destroy()  取消全局loading
