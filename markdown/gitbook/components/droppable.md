<h1>zd 拖拽</h1>

### 如何使用


```ts
<zd [data]="data" [renderItem]="renderItem" (zdSortChange)="sortChange($event)"></zd>
<ng-template #renderItem let-i>
    <p>{{i.content}}</p>
</ng-template>
```

### Api
| 参数        | 说明           | 类型  |默认值  |
| ------------- |:-------------:| -----:|-----:|
| `[data]`     | 数据数组 | `any[]` | - |
| `[disabled]`     | 是否可拖拽 | `boolean` | false |
| `[renderItem]` | 指定 zd 挂载的 HTML 节点 | `HTMLElement() => HTMLElement` | null |
| `[zdSortChange]`     | 拖动排序之后的回调 | `EventEmitter` | - |

