---
title: ant-design-components
---
# ant-design-components

## Button

<a-button type="primary">Primary</a-button> 
<a-button>Default</a-button>
<a-button type="dashed">      Dashed    </a-button>
<a-button type="danger">      Danger    </a-button> 
<a-config-provider :auto-insert-space-in-button="false">
<a-button type="primary">        按钮      </a-button>    </a-config-provider>    <a-button type="primary">      按钮    </a-button> 
<a-button type="link">      Link    </a-button>



<h4>Basic</h4>
<a-button-group>
<a-button>Cancel</a-button>
<a-button type="primary">OK</a-button>
</a-button-group>
<a-button-group>
<a-button disabled>L</a-button>
<a-button disabled>M</a-button>
<a-button disabled>R</a-button>
</a-button-group>
<a-button-group>
<a-button type="primary">L</a-button>
<a-button>M</a-button>
<a-button>M</a-button>
<a-button type="dashed">R</a-button>
</a-button-group>
<h4>With Icon</h4>
<a-button-group>
<a-button type="primary"> <a-icon type="left" />Go back </a-button>
<a-button type="primary"> Go forward<a-icon type="right" /> </a-button></a-button-group>


<a-button-group>
<a-button type="primary" icon="cloud" />
<a-button type="primary" icon="cloud-download" />
</a-button-group>

<style>
#components-button-demo-button-group > h4 {
  margin: 16px 0;
  font-size: 14px;
  line-height: 1;
  font-weight: normal;
}
#components-button-demo-button-group > h4:first-child {
  margin-top: 0;
}
#components-button-demo-button-group .ant-btn-group {
  margin-right: 8px;
}
</style>

<div>
    <a-button type="primary">
      Primary
    </a-button>
    <a-button type="primary" disabled>
      Primary(disabled)
    </a-button>
    <br />
    <a-button>Default</a-button>
    <a-button disabled>
      Default(disabled)
    </a-button>
    <br />
    <a-button type="dashed">
      Dashed
    </a-button>
    <a-button type="dashed" disabled>
      Dashed(disabled)
    </a-button>
    <br />
    <a-button type="link">
      Link
    </a-button>
    <a-button type="link" disabled>
      Link(disabled)
    </a-button>
    <div :style="{ padding: '8px 8px 0 8px', background: 'rgb(190, 200, 200)' }">
      <a-button ghost>
        Ghost
      </a-button>
      <a-button ghost disabled>
        Ghost(disabled)
      </a-button>
    </div>
  </div>
  

## icon

- vue组件

```
<AntDesign-icon/>
```

<AntDesign-icon/>

- 直接

```
<a-icon type="home" />
<a-icon type="setting" theme="filled" />
<a-icon type="smile" theme="outlined" />
<a-icon type="sync" spin />
<a-icon type="smile" :rotate="180" />
<a-icon type="loading" />
<a-icon type="smile" theme="twoTone" /> 
<a-icon type="heart" theme="twoTone" two-tone-color="#eb2f96" /> 
<a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
<a-icon type="star" theme="filled" />
<a-icon type="message" :style="{ fontSize: '16px', color: '#08c' }" />
```

<a-icon type="home" />
<a-icon type="setting" theme="filled" />
<a-icon type="smile" theme="outlined" />
<a-icon type="sync" spin />
<a-icon type="smile" :rotate="180" />
<a-icon type="loading" />
<a-icon type="smile" theme="twoTone" /> 
<a-icon type="heart" theme="twoTone" two-tone-color="#eb2f96" /> 
<a-icon type="check-circle" theme="twoTone" two-tone-color="#52c41a" />
<a-icon type="star" theme="filled" />
<a-icon type="message" :style="{ fontSize: '16px', color: '#08c' }" />


<style scoped>
.anticon {
  margin-right: 6px;
  font-size: 32px;
}
</style>


## Grid

  <div>
    <a-row>
      <a-col :span="12">
        col-12
      </a-col>
      <a-col :span="12">
        col-12
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="8">
        col-8
      </a-col>
      <a-col :span="8">
        col-8
      </a-col>
      <a-col :span="8">
        col-8
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="6">
        col-6
      </a-col>
      <a-col :span="6">
        col-6
      </a-col>
      <a-col :span="6">
        col-6
      </a-col>
      <a-col :span="6">
        col-6
      </a-col>
    </a-row>
  </div>

## layout

<a-layout>
<a-layout-header>Header</a-layout-header>
<a-layout-content>Content</a-layout-content>
<a-layout-footer>Footer</a-layout-footer>
</a-layout>

## dropdown

<AntDesign-dropdown/>

  <a-skeleton avatar :paragraph="{ rows: 4 }" />


## checkbox

<a-checkbox checked>Checkbox</a-checkbox>

- input

```md
<a-input placeholder="Basic usage" />
```

<a-input placeholder="Basic usage" />

- radio

```
<a-radio checked>Radio</a-radio>
```

<a-radio checked>Radio</a-radio>

- rate

```
<a-rate :defaultValue="4.5" allowHalf />
```

<a-rate :defaultValue="4.5" allowHalf />

- Divider 

<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo. 
</p>    <a-Divider />
<p> 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
</p><a-Divider dashed /> 
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
</p><a-Divider>Text</a-Divider>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
</p><a-Divider orientation="left">Left Text</a-Divider>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
</p><a-Divider orientation="right">Right Text</a-Divider>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
</p>
Text<a-Divider type="vertical" /><a href="#">Link</a><a-Divider type="vertical" /><a href="#">Link</a>

<a-Spin />

## calendar
<AntDesign-calendar/>

## card
<AntDesign-card/>

## carousel
<AntDesign-carousel/>

## collapse
<AntDesign-collapse/>

## comment
<AntDesign-comment/>

## dropdown
<AntDesign-dropdown/>

## list
<AntDesign-list/>

## steps
<AntDesign-steps/>

## statistic
<AntDesign-statistic/>

## tabs
<AntDesign-tabs/>

## tag
<AntDesign-tag/>

## timeline
<AntDesign-timeline/>

## tree
<AntDesign-tree/>







