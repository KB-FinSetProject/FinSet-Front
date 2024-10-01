<template>
  <HeaderNormal navbarTitle="관심목록" />

</template>



<style scoped>
.bank-logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  position: relative;
  margin-right: 20px;
}
.wish-item {
  font-weight: bold;
  border-radius: 5px; /* Rounded corners */
  padding: 10px; /* Padding around items */
  background-color: #f9f9f9; /* Light background */
}
.deposit-yield {
  text-align: right;
  flex-direction: column;
  display: flex;
  position: relative;
  right: 10px;
  align-items: flex-end;
}
.max {
  font-size: 22px;
  color: #F8A70C;
  margin-bottom: 0;
}
.basic {
  font-size: 15px;
  color: #7e7e7e;
}

.fa-caret-down {
  cursor: pointer;
  margin: 10px 0;
}

.wish {
  margin-top: 100px;
  margin-bottom: 150px;
}

.icon {
  color: #FFBF0A;
  font-size: 1.5rem;
  position: absolute;
  transform: translateX(1100%);
}
.fund-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.fund-info {
  position: relative;
  left: -20px;
}
.fund-details {
  margin-bottom: 0;
}
.fund-name {
  margin-bottom: 0;
  font-weight: bold;
}

.high-rating {
  background-color: #FDEBEA;
  color: #FF6767;
  padding: 3px 8px;
  font-size: 10px;
  border-radius: 6px;
}

</style>