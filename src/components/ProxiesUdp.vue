<template>
  <div>
    <el-table :data="proxies" :default-sort="{prop: 'name', order: 'ascending'}" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-popover
            ref="popover4"
            placement="right"
            width="600"
  		  style="margin-left:0px"
            trigger="click">
            <my-traffic-chart :proxy_name="props.row.name"></my-traffic-chart>
          </el-popover>
  
          <el-button v-popover:popover4 type="primary" size="small" icon="view" style="margin-bottom:10px">流量监控</el-button>
  
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="类型">
              <span>{{ props.row.type }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.addr }}</span>
            </el-form-item>
            <el-form-item label="加密">
              <span>{{ props.row.encryption }}</span>
            </el-form-item>
            <el-form-item label="压缩">
              <span>{{ props.row.compression }}</span>
            </el-form-item>
            <el-form-item label="最近在线">
              <span>{{ props.row.last_start_time }}</span>
            </el-form-item>
            <el-form-item label="最近断线">
              <span>{{ props.row.last_close_time }}</span>
            </el-form-item>
        </el-form>
    </template>
    </el-table-column>
    <el-table-column
      label="名称"
      prop="name"
      sortable>
    </el-table-column>
    <el-table-column
      label="端口"
      prop="port"
      sortable>
    </el-table-column>
    <el-table-column
      label="连接"
      prop="conns"
      sortable>
    </el-table-column>
    <el-table-column
      label="流量输入"
      prop="traffic_in"
      :formatter="formatTrafficIn"
      sortable>
    </el-table-column>
    <el-table-column
      label="流量出口"
      prop="traffic_out"
      :formatter="formatTrafficOut"
      sortable>
    </el-table-column>
    <el-table-column
      label="状态"
      prop="status"
      sortable>
      <template slot-scope="scope">
        <el-tag type="success" v-if="scope.row.status === '在线'">{{ scope.row.status }}</el-tag>
        <el-tag type="danger" v-else>{{ scope.row.status }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  import Humanize from 'humanize-plus';
  import Traffic from './Traffic.vue'
  import {
    UdpProxy
  } from '../utils/proxy.js'
  export default {
    data() {
      return {
        proxies: null
      }
    },
    created() {
      this.fetchData()
    },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      formatTrafficIn(row, column) {
        return Humanize.fileSize(row.traffic_in)
      },
      formatTrafficOut(row, column) {
        return Humanize.fileSize(row.traffic_out)
      },
      fetchData() {
        fetch('/api/proxy/udp', {credentials: 'include'})
          .then(res => {
            return res.json()
          }).then(json => {
            this.proxies = new Array()
            for (let proxyStats of json.proxies) {
              this.proxies.push(new UdpProxy(proxyStats))
            }
          })
      }
    },
    components: {
        'my-traffic-chart': Traffic
    }
  }
</script>

<style>
</style>
