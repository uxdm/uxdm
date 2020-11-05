## Classes

<dl>
<dt><a href="#AbstractRect">AbstractRect</a></dt>
<dd><p>抽象矩形</p></dd>
<dt><a href="#Bounding">Bounding</a></dt>
<dd><p>定界框</p></dd>
</dl>

<a name="AbstractRect"></a>

## AbstractRect
<p>抽象矩形</p>

**Kind**: global class  
<a name="new_AbstractRect_new"></a>

### new AbstractRect()
<p>业务实体中的抽象矩形
可以用在定界框 矩形图形 布局 等实体中
Defines an abstract rectangle of object</p>

<a name="Bounding"></a>

## Bounding
<p>定界框</p>

**Kind**: global class  

* [Bounding](#Bounding)
    * [new Bounding()](#new_Bounding_new)
    * [.centerX](#Bounding+centerX)
    * [.scale(ratio)](#Bounding+scale)
    * [.offset(x, y)](#Bounding+offset)
    * [.applyMatrix(matrix)](#Bounding+applyMatrix)

<a name="new_Bounding_new"></a>

### new Bounding()
<p>用于描述对象在空间坐标中的实际位置、变换、旋转和缩放的情况</p>

<a name="Bounding+centerX"></a>

### bounding.centerX
<p>旋转角度</p>

**Kind**: instance property of [<code>Bounding</code>](#Bounding)  
<a name="Bounding+scale"></a>

### bounding.scale(ratio)
<p>按比例缩放宽高</p>

**Kind**: instance method of [<code>Bounding</code>](#Bounding)  

| Param |
| --- |
| ratio | 

<a name="Bounding+offset"></a>

### bounding.offset(x, y)
<p>偏移</p>

**Kind**: instance method of [<code>Bounding</code>](#Bounding)  

| Param | Description |
| --- | --- |
| x | <p>X坐标</p> |
| y | <p>Y坐标</p> |

<a name="Bounding+applyMatrix"></a>

### bounding.applyMatrix(matrix)
<p>应用矩阵</p>

**Kind**: instance method of [<code>Bounding</code>](#Bounding)  

| Param |
| --- |
| matrix | 

