<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <e-aside>
        <nav>
          <ul>
            <li><router-link to="/dao/block">block</router-link></li>
            <li><router-link to="/dao/keyword">keyword</router-link></li>
            <li><router-link to="/dao/author">author</router-link></li>
          </ul>
        </nav>
      </e-aside>
      <el-main><router-view /></el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>
